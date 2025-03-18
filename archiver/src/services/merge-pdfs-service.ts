import { PDFMerger } from "@/lib/pdf-merger"

export class MergePDFsService {
  private merger: PDFMerger
  private pdfs: Buffer[]

  constructor(pdfs: Buffer[]) {
    this.merger = new PDFMerger()
    this.pdfs = pdfs
  }

  async merge(): Promise<Buffer> {
    this.pdfs.forEach(async (pdf) => {
      await this.merger.add(pdf)
    })

    return this.merger.saveAsBuffer()
  }
}
