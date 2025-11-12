import { exec } from "child_process"
import { isEmpty } from "lodash"
import { writeFileSync, readFileSync, unlinkSync } from "fs"
import { tmpdir } from "os"
import { join } from "path"

import logger from "@/utils/logger"

import { PDF_SIGNER_JAR, TIMESTAMP_SERVER, SSL_FULL_CHAIN_PATH, SSL_CERT_KEY_PATH } from "@/config"

if (isEmpty(PDF_SIGNER_JAR)) throw new Error("pdf signer jar filepath is unset.")
if (isEmpty(TIMESTAMP_SERVER)) throw new Error("timestamp server is unset.")
if (isEmpty(SSL_FULL_CHAIN_PATH)) throw new Error("ssl fullchain filepath is unset.")
if (isEmpty(SSL_CERT_KEY_PATH)) throw new Error("ssl cert key filepath is unset.")

const getTempFilePath = (prefix: string) => join(tmpdir(), `${prefix}-${Date.now()}.pdf`)

export async function signPDFWithPAdES(inputPDF: Buffer): Promise<Buffer> {
  const tempInputPath = getTempFilePath("input")
  const tempOutputPath = getTempFilePath("output")

  try {
    writeFileSync(tempInputPath, inputPDF)

    const cmd: string = `java -jar ${PDF_SIGNER_JAR} --input ${tempInputPath} --output ${tempOutputPath} --certificate ${SSL_FULL_CHAIN_PATH} --key ${SSL_CERT_KEY_PATH} --timestamp --tsa ${TIMESTAMP_SERVER} --baseline-lt`

    await new Promise<void>((resolve, reject) => {
      exec(cmd, { encoding: "buffer" }, (error, _stdout, stderr) => {
        if (error) {
          logger.error("open-pdf-sign error:", stderr.toString())
          reject(new Error(`open-pdf-sign error: ${stderr.toString()}`))
          return
        }
        resolve()
      })
    })

    const signedPdfBuffer = readFileSync(tempOutputPath)
    return signedPdfBuffer
  } finally {
    try {
      unlinkSync(tempInputPath)
      unlinkSync(tempOutputPath)
    } catch (cleanupError) {
      logger.warn("Failed to clean up temporary files:", cleanupError)
    }
  }
}
