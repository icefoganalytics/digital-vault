import express, { Request, Response } from "express"
import { join } from "path"

import { NODE_ENV } from "@/config"
import dbLegacy from "@/db/db-client-legacy"
import { logger } from "@/utils/logger"

export class Migrator {
  readonly migrationRouter

  constructor() {
    this.migrationRouter = express.Router()

    this.migrationRouter.get("/", async (_req: Request, res: Response) => {
      return res.json({ data: await this.listMigrations() })
    })

    this.migrationRouter.get("/up", async (_req: Request, res: Response) => {
      try {
        await this.migrateUp()
      } catch (err) {
        logger.error(err)
      }
      return res.json({ data: await migrator.listMigrations() })
    })

    this.migrationRouter.get("/down", async (_req: Request, res: Response) => {
      try {
        await this.migrateDown()
      } catch (err) {
        logger.error(err)
      }
      return res.json({ data: await this.listMigrations() })
    })

    this.migrationRouter.get("/seed/:environment?", async (req: Request, res: Response) => {
      try {
        await this.seedUp(req.params.environment)
      } catch (err) {
        logger.error(err)
      }
      return res.json({ data: "Seeding" })
    })
  }

  listMigrations() {
    return dbLegacy.migrate.list({ directory: join(__dirname, "migrations") })
  }

  async migrateUp() {
    logger.warn("-------- MIGRATE UP ---------")
    return dbLegacy.migrate.up({ directory: join(__dirname, "migrations") })
  }

  async migrateDown() {
    logger.warn("-------- MIGRATE DOWN ---------")
    return dbLegacy.migrate.down({ directory: join(__dirname, "migrations") })
  }

  async migrateLatest() {
    logger.warn("-------- MIGRATE LATEST ---------")
    return dbLegacy.migrate.latest({ directory: join(__dirname, "migrations") })
  }

  async seedUp(environment?: string) {
    logger.warn("-------- SEED UP ---------")
    return dbLegacy.seed.run({ directory: join(__dirname, "seeds", environment || NODE_ENV) })
  }
}
const migrator = new Migrator()

export default migrator
