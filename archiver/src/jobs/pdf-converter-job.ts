import { isNil } from "lodash"

import { FileStorageService } from "@/services"
import { ArchiveItemFile } from "@/models"
import cache from "@/db/cache-client"

import { bufferToPdf } from "@/utils/buffer-to-pdf"
import { signPDFWithPAdES } from "@/utils/pdf-signer"
import logger from "@/utils/logger"

export class PDFConverterJob {
  name = "pdf-converter"
  schedule = "*/1 * * * *"

  constructor() {}

  async run(statDate: Date) {
    logger.info("Running PDF Converter Job", statDate)
    const toConvert = await cache.getKeysByPattern(`CONVERT_`)
    const fileStore = new FileStorageService()

    const archiveItems = new Map<number, { archiveItemId: number; fileCount: number }>()

    for (const key of toConvert) {
      const data = await cache.getValue(key)

      if (isNil(data)) return

      const fileInfo = JSON.parse(data)
      const file = await fileStore.downloadFile(fileInfo.originalKey)
      const fileRecord = await ArchiveItemFile.findBySlugOrPk(fileInfo.id)
      if (!fileRecord) return

      const folderKey = fileInfo.originalKey.substring(0, fileInfo.originalKey.indexOf("/"))
      const convertedPdfKey = `${folderKey}/${fileStore.makeKey()}`

      const fileAsPDF = await bufferToPdf(file)

      const signedPdf = await signPDFWithPAdES(fileAsPDF)

      const uploadResp = await fileStore.uploadBuffer(convertedPdfKey, signedPdf)

      if (uploadResp.errorCode) {
        throw Error("File upload error")
      }

      await fileRecord.update({
        pdfKey: convertedPdfKey,
        pdfFileName: `${fileRecord.originalFileName}_SIGNED.pdf`,
        pdfMimeType: "application/pdf",
        pdfFileSize: signedPdf.length,
      })

      cache.deleteValue(key)

      const existingEntry = archiveItems.get(fileRecord.archiveItemId)
      if (existingEntry) {
        archiveItems.set(fileRecord.archiveItemId, {
          archiveItemId: fileRecord.archiveItemId,
          fileCount: existingEntry.fileCount + 1,
        })
      } else {
        archiveItems.set(fileRecord.archiveItemId, {
          archiveItemId: fileRecord.archiveItemId,
          fileCount: 1,
        })
      }
    }

    archiveItems.forEach((data, archiveItemId) => {
      cache.setValueNoExpire(
        `PENDING_FILESTORE_UPLOAD_ARCHIVE_ITEM_ID_${archiveItemId}`,
        JSON.stringify(data)
      )
    })
  }
}
