import { Sequelize, Options } from "@sequelize/core"
import { MsSqlDialect } from "@sequelize/mssql"
import { isEmpty, isNil } from "lodash"

import {
  AZURE_SQL_DATABASE,
  AZURE_SQL_HOST,
  AZURE_SQL_PASSWORD,
  AZURE_SQL_PORT,
  AZURE_SQL_USERNAME,
  DB_TRUST_SERVER_CERTIFICATE,
  NODE_ENV,
} from "@/config"

if (isEmpty(AZURE_SQL_DATABASE)) throw new Error("database name is unset.")
if (isEmpty(AZURE_SQL_USERNAME)) throw new Error("database username is unset.")
if (isEmpty(AZURE_SQL_PASSWORD)) throw new Error("database password is unset.")
if (isEmpty(AZURE_SQL_HOST)) throw new Error("database host is unset.")
if (isNil(AZURE_SQL_PORT) || isNaN(AZURE_SQL_PORT)) throw new Error("database port is unset.")

// See https://sequelize.org/docs/v7/databases/mssql/
export const SEQUELIZE_CONFIG: Options<MsSqlDialect> = {
  dialect: MsSqlDialect,
  server: AZURE_SQL_HOST,
  port: AZURE_SQL_PORT,
  database: AZURE_SQL_DATABASE,
  encrypt: false,
  authentication: {
    type: "default",
    options: {
      userName: AZURE_SQL_USERNAME,
      password: AZURE_SQL_PASSWORD,
    },
  },
  schema: "dbo", // default - explicit for clarity
  // Avoids need to have a signed certificate in development.
  trustServerCertificate: DB_TRUST_SERVER_CERTIFICATE,
  //logging: NODE_ENV === "development" ? console.log : false,
  define: {
    underscored: true,
    timestamps: true, // default - explicit for clarity.
    paranoid: true, // adds deleted_at column
  },
}

const db = new Sequelize(SEQUELIZE_CONFIG)

export default db
