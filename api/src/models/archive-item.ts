import {
  type CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  type NonAttribute,
  sql,
} from "@sequelize/core"
import {
  Attribute,
  AutoIncrement,
  BelongsToMany,
  Default,
  HasMany,
  NotNull,
  PrimaryKey,
  ValidateAttribute,
} from "@sequelize/core/decorators-legacy"
import { isEmpty, isNil } from "lodash"

import BaseModel from "@/models/base-model"
import ArchiveItemFile from "@/models/archive-item-file"
import Category from "./category"
import ArchiveItemCategory from "./archive-item-category"

/** Keep in sync with web/src/api/users-api.ts */
export enum SecurityLevel {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
}

export enum ArchiveItemStatus {
  ACCEPTED = "Accepted",
  REVIEWED = "Reviewed",
  LOCKED = "Locked",
  HIDDEN = "Hidden",
}

export class ArchiveItem extends BaseModel<
  InferAttributes<ArchiveItem>,
  InferCreationAttributes<ArchiveItem>
> {
  static readonly SecurityLevel = SecurityLevel
  static readonly ArchiveItemStatus = ArchiveItemStatus

  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>

  @Attribute(DataTypes.STRING(255))
  @NotNull
  declare retentionName: string

  @Attribute(DataTypes.DATE(0))
  @NotNull
  declare calculatedExpireDate: Date

  @Attribute(DataTypes.DATE(0))
  declare overrideExpireDate: Date | null

  @Attribute(DataTypes.STRING(255))
  @NotNull
  declare expireAction: string

  @Attribute(DataTypes.INTEGER)
  declare sourceId: number | null

  @Attribute(DataTypes.INTEGER)
  declare userId: number | null

  @Attribute(DataTypes.STRING(2000))
  @NotNull
  declare title: string

  @Attribute(DataTypes.TEXT)
  declare description: string | null

  @Attribute(DataTypes.TEXT)
  declare summary: string | null

  @Attribute(DataTypes.STRING(100))
  @NotNull
  @ValidateAttribute({
    isIn: {
      args: [Object.values(ArchiveItemStatus)],
      msg: `Status must be one of ${Object.values(ArchiveItemStatus).join(", ")}`,
    },
  })
  declare status: ArchiveItemStatus

  @Attribute(DataTypes.INTEGER)
  @NotNull
  @ValidateAttribute({
    isIn: {
      args: [Object.values(SecurityLevel)],
      msg: `Security Level must be one of ${Object.values(SecurityLevel).join(", ")}`,
    },
  })
  declare securityLevel: SecurityLevel

  @Attribute({
    type: DataTypes.STRING(255),
    get() {
      const tags = this.getDataValue("tags")
      if (isNil(tags) || isEmpty(tags)) {
        return []
      }
      return tags.split(",")
    },
    set(value: string[]) {
      this.setDataValue("tags", value.filter((v) => !isEmpty(v.trim())).join(","))
    },
  })
  declare tags: string[] | null

  @Attribute(DataTypes.DATE(0))
  @NotNull
  @Default(sql.fn("getutcdate"))
  declare submittedAt: CreationOptional<Date>

  @Attribute(DataTypes.DATE(0))
  @NotNull
  @Default(sql.fn("getutcdate"))
  declare createdAt: CreationOptional<Date>

  @Attribute(DataTypes.DATE(0))
  @NotNull
  @Default(sql.fn("getutcdate"))
  declare updatedAt: CreationOptional<Date>

  @Attribute(DataTypes.DATE(0))
  declare deletedAt: Date | null

  // Magic Attributes

  // Associations
  @HasMany(() => ArchiveItemFile, {
    foreignKey: "archiveItemId",
    inverse: "archiveItem",
  })
  declare files?: NonAttribute<ArchiveItemFile[]>

  @BelongsToMany(() => Category, {
    through: { model: ArchiveItemCategory },
  })
  declare categories?: NonAttribute<Category[]>

  // Scopes
  static establishScopes(): void {
    this.addSearchScope(["title", "tags"])
  }
}

export default ArchiveItem
