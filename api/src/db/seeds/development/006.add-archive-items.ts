import { Knex } from "knex"

import { ArchiveItem, ArchiveItemCategory, Category, Retention, Source } from "@/models"
import { ArchiveItemStatus, SecurityLevel } from "@/models/archive-item"
import { DateTime } from "luxon"

export async function seed(_knex: Knex): Promise<void> {
  const source1 = await Source.findOne({
    where: {
      name: "WRAP",
    },
    rejectOnEmpty: true,
  })
  const category1 = await Category.findOne({
    where: {
      name: "HPW Finance",
    },
    rejectOnEmpty: true,
  })
  const category2 = await Category.findOne({
    where: {
      name: "HPW HR",
    },
    rejectOnEmpty: true,
  })

  const item = await ArchiveItem.create({
    title: "Testing",
    status: ArchiveItemStatus.ACCEPTED,
    securityLevel: SecurityLevel.LOW,
    calculatedExpireDate: DateTime.now().plus({ days: 10 }).toJSDate(),
    expireAction: "Hide",
    retentionName: "Hide",
    tags: ["Finance", "Testing"],
    sourceId: source1.id,
  })

  await ArchiveItemCategory.create({
    archiveItemId: item.id,
    categoryId: category1.id,
    setBySourceId: source1.id,
  })
  await ArchiveItemCategory.create({
    archiveItemId: item.id,
    categoryId: category2.id,
    setBySourceId: source1.id,
  })

  const inserted = await item.reload({ include: [{ model: Category, include: Retention }] })

  console.log(inserted.dataValues)
  console.log(inserted.categories?.map((c) => c.dataValues))

  // item.

  /*  for (const attributes of categories) {
    let item = await SourceCategory.findOne({
      where: {
        sourceId: attributes.sourceId,
        categoryId: attributes.categoryId,
      },
    })
    if (isNil(item)) {
      item = await SourceCategory.create(attributes)
      logger.debug("SourceCategory created:", item.dataValues)
    } else {
      await item.update(attributes)
      logger.debug("SourceCategory updated:", item.dataValues)
    }
  } */
}
