import { pick } from "lodash"

import { ArchiveItem } from "@/models"
import BaseSerializer from "@/serializers/base-serializer"

export type ArchiveItemIndexView = Pick<ArchiveItem, "title" | "description" | "summary">

export class IndexSerializer extends BaseSerializer<ArchiveItem> {
  perform(): ArchiveItemIndexView {
    return {
      ...pick(this.record, ["id", "title", "description", "summary"]),
    }
  }
}

export default IndexSerializer
