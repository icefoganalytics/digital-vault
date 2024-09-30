import dbLegacy from "@/db/db-client-legacy"
import { logger } from "@/utils/logger"

export async function isValidConnection() {
  try {
    await dbLegacy.raw("SELECT GETDATE()")
    logger.info("Connection has been established successfully.")
    return true
  } catch (error) {
    logger.error("Unable to connect to the database: " + error)
    return false
  }
}

if (require.main === module) {
  isValidConnection()
}
