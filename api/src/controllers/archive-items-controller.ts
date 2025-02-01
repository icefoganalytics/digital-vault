import logger from "@/utils/logger"
import { ArchiveItem, ArchiveItemFile, Category, User } from "@/models"
import { ArchiveItemsPolicy } from "@/policies"
import { IndexSerializer } from "@/serializers/archive-items"
import BaseController from "@/controllers/base-controller"
import { CreateService } from "@/services/archive-items"
import { isNil } from "lodash"

export class ArchiveItemsController extends BaseController<ArchiveItem> {
  async index() {
    try {
      const where = this.buildWhere()
      const scopes = this.buildFilterScopes(["ArchiveItemsOnly", "withArchiveItemFileCounts"])
      const scopedItems = ArchiveItemsPolicy.applyScope(scopes, this.currentUser)

      const totalCount = await scopedItems.count({ where })
      const archiveItems = await scopedItems.findAll({
        where,
        limit: this.pagination.limit,
        offset: this.pagination.offset,
      })

      const serializedItems = IndexSerializer.perform(archiveItems)
      return this.response.json({
        archiveItems: serializedItems,
        totalCount,
      })
    } catch (error) {
      logger.error("Error fetching archive items" + error)
      return this.response.status(400).json({
        message: `Error fetching archive items: ${error}`,
      })
    }
  }

  async create() {
    try {
      const policy = this.buildPolicy()
      if (!policy.create()) {
        return this.response.status(403).json({
          message: "You are not authorized to create items",
        })
      }

      const permittedAttributes = policy.permitAttributesForCreate(this.request.body)

      const archiveItem = await CreateService.perform({
        ...permittedAttributes,
        categoryIds: this.request.body.categories,
        files: this.request.body.files,
        currentUser: this.request.currentUser,
      })

      return this.response.status(201).json({ archiveItem })
    } catch (error) {
      logger.error("Error creating archive item" + error)
      return this.response.status(422).json({
        message: `Error creating archive item: ${error}`,
      })
    }
  }

  async show() {
    try {
      const archiveItem = await this.loadArchiveItem()
      if (isNil(archiveItem)) {
        return this.response.status(404).json({
          message: "Archive item not found",
        })
      }

      const policy = this.buildPolicy(archiveItem)
      if (!policy.show()) {
        return this.response.status(403).json({
          message: "You are not authorized to view this item",
        })
      }

      return this.response.json({ archiveItem, policy })
    } catch (error) {
      logger.error("Error fetching item" + error)
      return this.response.status(400).json({
        message: `Error fetching item: ${error}`,
      })
    }
  }

  private async loadArchiveItem() {
    return ArchiveItem.findByPk(this.params.id, {
      include: [{ model: Category }, { model: ArchiveItemFile }, { model: User }],
    })
  }

  private buildPolicy(archiveItem: ArchiveItem = ArchiveItem.build()) {
    return new ArchiveItemsPolicy(this.currentUser, archiveItem)
  }
}

export default ArchiveItemsController
