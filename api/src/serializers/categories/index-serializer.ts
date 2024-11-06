import { pick } from "lodash"

import { Category } from "@/models"
import BaseSerializer from "@/serializers/base-serializer"

export type CategoryIndexView = Pick<Category, "id" | "name" | "description" | "retentionId">

export class IndexSerializer extends BaseSerializer<Category> {
  perform(): CategoryIndexView {
    return {
      ...pick(this.record, ["id", "name", "description", "retentionId"]),
    }
  }
}

export default IndexSerializer
