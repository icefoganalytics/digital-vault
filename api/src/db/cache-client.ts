import { REDIS_CONNECTION_URL } from "@/config"
import { logger } from "@/utils/logger"
import { RedisClientType, createClient } from "@redis/client"

class CacheClient {
  protected client: RedisClientType
  protected failures: number = 0

  constructor() {
    logger.info(`INIT CACHE: ${REDIS_CONNECTION_URL}`)
    this.client = createClient({ url: REDIS_CONNECTION_URL })

    this.client.on("error", (err) => {
      this.onError(err)
    })
    this.client.on("connect", () => {
      this.failures = 0
      logger.info("Redis Client Connect")
    })
  }

  onError(err: unknown) {
    if (this.failures < 5) {
      this.failures++
      logger.error(`Redis Connection Error ${this.failures}: ${err.message}`)
    } else if (this.failures == 5) {
      this.failures++
      logger.error("Giving up on Redis")
    }
  }

  async getClient() {
    await this.client.connect()

    return this
  }

  async setValue(key: string, value: any) {
    this.client.set(key, value)
  }
  async getValue(key: string) {
    return this.client.get(key)
  }
  async deleteValue(key: string) {
    return this.client.del(key)
  }
}

const cache = new CacheClient()

export default cache
