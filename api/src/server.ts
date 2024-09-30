import { API_PORT, JOB_PORT, APPLICATION_NAME, RUN_SCHEDULER } from "@/config"
import app from "@/app"
import { startScheduler } from "@/jobs"
import { logger } from "./utils/logger"

if (RUN_SCHEDULER == "true") {
  startScheduler()
  logger.info(`${APPLICATION_NAME} JOBS listenting on port ${JOB_PORT}`)
} else {
  app.listen(API_PORT, async () => {
    logger.info(`${APPLICATION_NAME} API listenting on port ${API_PORT}`)
  })
}
