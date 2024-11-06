import { Attributes, FindOptions } from "@sequelize/core"

import { Path } from "@/utils/deep-pick"
import { ArchiveItem, User } from "@/models"
import { PolicyFactory } from "@/policies/base-policy"

export class ArchiveItemsPolicy extends PolicyFactory(ArchiveItem) {
  show(): boolean {
    return true
  }

  create(): boolean {
    //if (this.user.isSystemAdmin) return true

    return true
  }

  update(): boolean {
    //if (this.user.isSystemAdmin) return true
    //if (this.user.id === this.record.id) return true

    return false
  }

  destroy(): boolean {
    //if (this.user.isSystemAdmin) return true

    return false
  }

  permittedAttributes(): Path[] {
    const attributes: (keyof Attributes<ArchiveItem>)[] = [
      "retentionName",
      "calculatedExpireDate",
      "overrideExpireDate",
      "expireAction",
      "sourceId",
      "userId",
      "title",
      "description",
      "summary",
      "status",
      "securityLevel",
      "tags",
      "submittedAt",
    ]

    /* if (this.user.isSystemAdmin) {
      attributes.push("email", "roles", "deactivatedAt")
    } */

    return attributes
  }

  permittedAttributesForCreate(): Path[] {
    return [...this.permittedAttributes()]
  }

  static policyScope(_user: User): FindOptions<Attributes<ArchiveItem>> {
    return {}
  }
}

export default ArchiveItemsPolicy
