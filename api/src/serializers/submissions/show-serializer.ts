import { pick } from "lodash"

import { Submission } from "@/models"
import BaseSerializer from "@/serializers/base-serializer"

export type SubmissionAsShow = Pick<
  Submission,
  | "id"
  | "sourceId"
  | "archiveItemId"
  | "referrerIpAddress"
  | "status"
  | "errorMessage"
  | "inputData"
  | "processedData"
  | "outputData"
  | "submittedAt"
  | "processedAt"
  | "createdAt"
  | "updatedAt"
>

export class ShowSerializer extends BaseSerializer<Submission> {
  perform(): SubmissionAsShow {
    return {
      ...pick(this.record, [
        "id",
        "sourceId",
        "archiveItemId",
        "referrerIpAddress",
        "status",
        "errorMessage",
        "inputData",
        "processedData",
        "outputData",
        "submittedAt",
        "processedAt",
        "createdAt",
        "updatedAt",
      ]),
    }
  }
}

export default ShowSerializer
