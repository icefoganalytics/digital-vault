import {
  DataTypes,
  sql,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
  type NonAttribute,
} from "@sequelize/core"
import {
  Attribute,
  AutoIncrement,
  BelongsTo,
  Default,
  NotNull,
  PrimaryKey,
  ValidateAttribute,
} from "@sequelize/core/decorators-legacy"

import BaseModel from "@/models/base-model"
import Source from "@/models/source"
import ArchiveItem from "@/models/archive-item"

export enum SubmissionStatuses {
  PENDING = "pending",
  PROCESSING = "processing",
  COMPLETED = "completed",
  FAILED = "failed",
}

export class Submission extends BaseModel<
  InferAttributes<Submission>,
  InferCreationAttributes<Submission>
> {
  static readonly Statuses = SubmissionStatuses

  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare sourceId: number

  @Attribute(DataTypes.INTEGER)
  declare archiveItemId: number | null

  @Attribute(DataTypes.STRING(45))
  @NotNull
  declare referrerIpAddress: string

  @Attribute(DataTypes.STRING(50))
  @NotNull
  @Default("pending")
  @ValidateAttribute({
    isIn: {
      args: [Object.values(SubmissionStatuses)],
      msg: `Status must be one of ${Object.values(SubmissionStatuses).join(", ")}`,
    },
  })
  declare status: CreationOptional<SubmissionStatuses>

  @Attribute(DataTypes.TEXT)
  declare errorMessage: string | null

  @Attribute(DataTypes.JSON)
  @NotNull
  declare inputData: Record<string, unknown>

  @Attribute(DataTypes.JSON)
  declare processedData: Record<string, unknown> | null

  @Attribute(DataTypes.JSON)
  declare outputData: Record<string, unknown> | null

  @Attribute(DataTypes.DATE)
  declare processedAt: Date | null

  @Attribute(DataTypes.DATE)
  @NotNull
  @Default(sql.fn("getutcdate"))
  declare createdAt: CreationOptional<Date>

  @Attribute(DataTypes.DATE)
  @NotNull
  @Default(sql.fn("getutcdate"))
  declare updatedAt: CreationOptional<Date>

  @Attribute(DataTypes.DATE)
  declare deletedAt: Date | null

  // Associations
  @BelongsTo(() => Source, {
    foreignKey: "sourceId",
    inverse: {
      as: "submissions",
      type: "hasMany",
    },
  })
  declare source?: NonAttribute<Source>

  @BelongsTo(() => ArchiveItem, {
    foreignKey: "archiveItemId",
    inverse: {
      as: "submissions",
      type: "hasMany",
    },
  })
  declare archiveItem?: NonAttribute<ArchiveItem | null>

  static establishScopes() {
    // add as needed
  }
}

export default Submission
