import path from "path"

import knex, { Knex } from "knex"
import camelcaseKeys from "camelcase-keys"
import { isEmpty, isNil, merge, snakeCase } from "lodash"

import {
  AZURE_SQL_DATABASE,
  AZURE_SQL_HOST,
  AZURE_SQL_PASSWORD,
  AZURE_SQL_PORT,
  AZURE_SQL_USERNAME,
  DB_TRUST_SERVER_CERTIFICATE,
  NODE_ENV,
} from "@/config"
import { NON_STANDARD_COLUMN_NAMES_TRANSFORMS } from "@/utils/db-wrap-identifier-helpers"

if (isEmpty(AZURE_SQL_DATABASE)) throw new Error("database name is unset.")
if (isEmpty(AZURE_SQL_USERNAME)) throw new Error("database username is unset.")
if (isEmpty(AZURE_SQL_PASSWORD)) throw new Error("database password is unset.")
if (isEmpty(AZURE_SQL_HOST)) throw new Error("database host is unset.")
if (isNil(AZURE_SQL_PORT) || isNaN(AZURE_SQL_PORT)) throw new Error("database port is unset.")

export function buildKnexConfig(options?: Knex.Config): Knex.Config {
  return merge({
    client: "mssql",
    connection: {
      host: AZURE_SQL_HOST,
      user: AZURE_SQL_USERNAME,
      password: AZURE_SQL_PASSWORD,
      database: AZURE_SQL_DATABASE,
      port: AZURE_SQL_PORT,
      options: {
        encrypt: false,
        trustServerCertificate: DB_TRUST_SERVER_CERTIFICATE,
      },
    },
    migrations: {
      directory: path.resolve(__dirname, "./migrations"),
      extension: "ts",
      stub: path.resolve(__dirname, "./templates/sample-migration.ts"),
    },
    seeds: {
      directory: path.resolve(__dirname, `./seeds/${NODE_ENV}`),
      extension: "ts",
      stub: path.resolve(__dirname, "./templates/sample-seed.ts"),
    },
    postProcessResponse: (
      result: Record<string, unknown>[] | Record<string, unknown>,
      _queryContext: unknown
    ) => {
      if (Array.isArray(result)) {
        // For SELECT queries
        return result.map((row) => camelcaseKeys(row, { deep: true }))
      } else {
        // for INSERT/UPDATE/DELETE queries
        return camelcaseKeys(result, { deep: true })
      }
    },
    wrapIdentifier: (
      value: string,
      origImpl: (value: string) => string,
      _queryContext: unknown
    ) => {
      if (value === "*") {
        return origImpl(value)
      }

      const specialValue = NON_STANDARD_COLUMN_NAMES_TRANSFORMS[value]
      if (specialValue) {
        return origImpl(specialValue)
      }

      return origImpl(snakeCase(value))
    },
  }, options)
}

const config = buildKnexConfig()
const dbLegacy = knex(config)

export default dbLegacy
