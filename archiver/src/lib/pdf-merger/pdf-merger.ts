import { isUndefined } from "lodash"
import { writeFileSync } from "fs"
import { PDFDocument } from "pdf-lib"

interface PDFMetadata {
  producer?: string
  author?: string
  title?: string
  creator?: string
}

export class PDFMerger {
  private doc?: PDFDocument
  private options = {
    ignoreEncryption: true,
  }

  async setMetadata(metadata: PDFMetadata): Promise<void> {
    if (isUndefined(this.doc)) {
      this.doc = await PDFDocument.create()
      this.doc.setProducer("digital-vault")
      this.doc.setCreationDate(new Date())
    }

    if (metadata.producer) this.doc.setProducer(metadata.producer)
    if (metadata.author) this.doc.setAuthor(metadata.author)
    if (metadata.title) this.doc.setTitle(metadata.title)
    if (metadata.creator) this.doc.setCreator(metadata.creator)
  }

  async add(input: Buffer, pages?: number[]): Promise<void> {
    if (isUndefined(this.doc)) {
      this.doc = await PDFDocument.create()
      this.doc.setProducer("digital-vault")
      this.doc.setCreationDate(new Date())
    }

    const srcDoc = await PDFDocument.load(input, this.options)
    let indices = []
    if (isUndefined(pages)) {
      indices = srcDoc.getPageIndices()
    } else {
      indices = pages.map((p) => p - 1)
    }

    const copiedPages = await this.doc.copyPages(srcDoc, indices)
    copiedPages.forEach((page) => {
      this.doc?.addPage(page)
    })
  }

  async saveAsBuffer(): Promise<Buffer> {
    if (isUndefined(this.doc)) {
      this.doc = await PDFDocument.create()
      this.doc.setProducer("digital-vault")
      this.doc.setCreationDate(new Date())
    }

    const uInt8Array = await this.doc.save()
    return Buffer.from(uInt8Array)
  }

  async save(fileName: string): Promise<void> {
    if (isUndefined(this.doc)) {
      this.doc = await PDFDocument.create()
      this.doc.setProducer("digital-vault")
      this.doc.setCreationDate(new Date())
    }

    const pdf = await this.doc.save()
    writeFileSync(fileName, pdf)
  }
}

export default PDFMerger
