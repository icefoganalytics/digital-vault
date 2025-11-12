import { isNil } from "lodash"

import { FileStorageService } from "@/services"
import { ArchiveItemFile } from "@/models"
import cache from "@/db/cache-client"

import { signPDFWithPAdES } from "@/utils/pdf-signer"
import { PDFMerger } from "@/lib/pdf-merger"
import logger from "@/utils/logger"

export class ArchiveItemUploadJob {
  name = "arhive-item-upload"
  schedule = "*/1 * * * *"

  constructor() {}

  async run(statDate: Date) {
    logger.info("Running Archive Item Upload Job", statDate)
    const toUploads = await cache.getKeysByPattern(`PENDING_FILESTORE_UPLOAD_ARCHIVE_ITEM_ID_`)
    const fileStore = new FileStorageService()

    for (const key of toUploads) {
      const data = await cache.getValue(key)

      if (isNil(data)) return

      const archiveItemInfo = JSON.parse(data)

      const archiveFiles = await ArchiveItemFile.findAll({
        where: {
          archiveItemId: archiveItemInfo.archiveItemId,
        },
      })

      const merger = new PDFMerger()

      for (const archiveFile of archiveFiles) {
        if (isNil(archiveFile.pdfKey)) return

        const file = await fileStore.downloadFile(archiveFile.pdfKey)
        await merger.add(file)
      }

      const mergedPDF = await merger.saveAsBuffer()
      const signedMergedPdf = await signPDFWithPAdES(mergedPDF)

      /* FILE STORE UPLOAD  */
      // Not sure where it should go

      // const folderKey = archiveItemInfo.originalKey.substring(
      //   0,
      //   archiveItemInfo.originalKey.indexOf("/")
      // )
      // const mergedAndSignedPdfKey = `${folderKey}/${fileStore.makeKey()}`

      // const uploadResp = await fileStore.uploadBuffer(mergedAndSignedPdfKey, signedMergedPdf)

      // if (uploadResp.errorCode) {
      //   throw Error("File upload error")
      // }

      // update file record?

      cache.deleteValue(key)
    }
  }
}
