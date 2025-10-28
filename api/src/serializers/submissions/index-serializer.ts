import { pick } from "lodash"

import { Submission } from "@/models"
import BaseSerializer from "@/serializers/base-serializer"

export type SubmissionAsIndex = Pick<
  Submission,
  | "id"
  | "sourceId"
  | "archiveItemId"
  | "status"
  | "submittedAt"
  | "processedAt"
  | "createdAt"
  | "updatedAt"
>

export class IndexSerializer extends BaseSerializer<Submission> {
  perform(): SubmissionAsIndex {
    return {
      ...pick(this.record, [
        "id",
        "sourceId",
        "archiveItemId",
        "status",
        "submittedAt",
        "processedAt",
        "createdAt",
        "updatedAt",
      ]),
    }
  }
}

export default IndexSerializer
