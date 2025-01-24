import cache from "@/db/cache-client"
import logger from "@/utils/logger"
import { FileStorageService } from "@/services"
import { isNil } from "lodash"
import { ArchiveItemFile } from "@/models"

export class PDFConverterJob {
  name = "pdf-converter"
  schedule = "*/1 * * * *"

  constructor() {}

  async run(statDate: Date) {
    logger.info("Running PDF Converter Job", statDate)
    const toConvert = await cache.getKeysByPattern(`CONVERT_`)
    const fileStore = new FileStorageService()

    for (const key of toConvert) {
      const data = await cache.getValue(key)

      if (isNil(data)) return

      const fileInfo = JSON.parse(data)
      const file = await fileStore.downloadFile(fileInfo.originalKey)
      const fileRecord = await ArchiveItemFile.findBySlugOrPk(fileInfo.id)
      if (!fileRecord) return

      const folderKey = fileInfo.originalKey.substring(0, fileInfo.originalKey.indexOf("/"))
      const convertedPdfKey = `${folderKey}/${fileStore.makeKey()}`

      console.log("DOWNLOADED FILE", file.length)

      //TODO: This is where the magical conversion and signing happens
      // the converted file should be called `convertedAndSignedFile`
      // it can be saved to a local directory for processing if required.

      // after the conversion is complete, upload the file to the file store, update the file record and delete the cache key
      /* 
      const uploadResp = await fileStore.uploadFile(convertedPdfKey, convertedAndSignedFile)

      if (uploadResp.errorCode) {
        throw Error("File upload error")
      }
      
      fileRecord.pdfKey = convertedPdfKey
      fileRecord.pdfFileName = `${fileRecord.originalFileName}_SIGNED.pdf`
      fileRecord.pdfMimeType = "application/pdf"
      fileRecord.pdfFileSize = convertedAndSignedFile.length
      await fileRecord.update()

      cache.deleteValue(key) */
    }
  }
}
