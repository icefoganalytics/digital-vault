import { scheduleJob } from "node-schedule"

import { APPLICATION_NAME } from "@/config"
import { PDFConverterJob } from "@/jobs"
import cache from "@/db/cache-client"
import logger from "@/utils/logger"
import { ArchiveItemUploadJob } from "./jobs/archive-item-upload-job"

export async function startScheduler() {
  logger.info("Scheduler starting in " + APPLICATION_NAME)

  const c = await cache.getClient()

  if (c) await c.setValue("mj", ":te", 3000)

  const converter = new PDFConverterJob()

  const archiveItemUploader = new ArchiveItemUploadJob()

  scheduleJob(converter.name, converter.schedule, converter.run)
  scheduleJob(archiveItemUploader.name, archiveItemUploader.schedule, archiveItemUploader.run)
}
