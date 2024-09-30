import { scheduleJob } from "node-schedule"
import { APPLICATION_NAME } from "@/config"
import cache from "@/db/cache-client"
import { logger } from "@/utils/logger"

export async function startScheduler() {
  logger.info("Scheduler starting in " + APPLICATION_NAME)

  const c = await cache.getClient()

  if (c) await c.setValue("mj", ":te")

  scheduleJob("testing", "* * * * *", () => {
    logger.info("Job Running " + new Date())
  })
}
