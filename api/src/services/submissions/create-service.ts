import { CreationAttributes } from "@sequelize/core"
import { isNil } from "lodash"

import { Submission, User } from "@/models"
import BaseService from "@/services/base-service"

export type SubmissionCreationAttributes = Partial<CreationAttributes<Submission>>

export class CreateService extends BaseService {
  constructor(
    private attributes: SubmissionCreationAttributes,
    private currentUser: User
  ) {
    super()
  }

  async perform(): Promise<Submission> {
    const { sourceId, referrerIpAddress, inputData, ...optionalAttributes } = this.attributes

    if (isNil(sourceId)) {
      throw new Error("sourceId is required")
    }

    if (isNil(referrerIpAddress)) {
      throw new Error("referrerIpAddress is required")
    }

    if (isNil(inputData)) {
      throw new Error("inputData is required")
    }

    const submission = await Submission.create({
      ...optionalAttributes,
      sourceId,
      referrerIpAddress,
      inputData,
    })

    return submission
  }
}

export default CreateService
