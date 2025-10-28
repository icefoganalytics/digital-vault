import { Attributes, FindOptions } from "@sequelize/core"

import { Path } from "@/utils/deep-pick"
import { Submission, User } from "@/models"
import { ALL_RECORDS_SCOPE, NO_RECORDS_SCOPE, PolicyFactory } from "@/policies/base-policy"

export class SubmissionsPolicy extends PolicyFactory(Submission) {
  show(): boolean {
    if (this.user.isSystemAdmin) return true

    return false
  }

  create(): boolean {
    return true
  }

  update(): boolean {
    if (this.user.isSystemAdmin) return true

    return false
  }

  destroy(): boolean {
    if (this.user.isSystemAdmin) return true

    return false
  }

  permittedAttributes(): Path[] {
    const attributes: (keyof Attributes<Submission>)[] = [
      "status",
      "processedData",
      "outputData",
      "processedAt",
      "errorMessage",
    ]

    return attributes
  }

  permittedAttributesForCreate(): Path[] {
    return [
      "sourceId",
      "archiveItemId",
      "referrerIpAddress",
      "inputData",
      ...this.permittedAttributes(),
    ]
  }

  static policyScope(user: User): FindOptions<Attributes<Submission>> {
    if (user.isSystemAdmin) return ALL_RECORDS_SCOPE

    return NO_RECORDS_SCOPE
  }
}

export default SubmissionsPolicy
