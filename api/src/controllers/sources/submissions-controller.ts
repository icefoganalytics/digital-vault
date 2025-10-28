import { isNil } from "lodash"

import logger from "@/utils/logger"
import { Submission, Source } from "@/models"
import { SourcePolicy, SubmissionsPolicy } from "@/policies"
import { IndexSerializer, ShowSerializer } from "@/serializers/submissions"
import { CreateService } from "@/services/submissions"
import BaseController from "@/controllers/base-controller"

export class SubmissionsController extends BaseController<Submission> {
  async index() {
    try {
      // TODO: make a "beforeEach" pattern that can run the source authorization checks.
      const source = await this.loadSource()
      if (isNil(source)) {
        return this.response.status(404).json({
          message: "Source not found",
        })
      }

      const sourcePolicy = this.buildSourcePolicy(source)
      if (!sourcePolicy.show()) {
        return this.response.status(403).json({
          message: "You are not authorized to view submissions for this source",
        })
      }

      const where = this.buildWhere()
      const scopes = this.buildFilterScopes()
      const order = this.buildOrder()
      const scopedSubmissions = SubmissionsPolicy.applyScope(scopes, this.currentUser)

      const totalCount = await scopedSubmissions.count({ where })
      const submissions = await scopedSubmissions.findAll({
        where,
        order,
        limit: this.pagination.limit,
        offset: this.pagination.offset,
      })

      const serializedSubmissions = IndexSerializer.perform(submissions)
      return this.response.json({
        submissions: serializedSubmissions,
        totalCount,
      })
    } catch (error) {
      logger.error(`Error fetching submissions ${error}`, { error })
      return this.response.status(400).json({
        message: `Error fetching submissions: ${error}`,
      })
    }
  }

  async show() {
    try {
      const source = await this.loadSource()
      if (isNil(source)) {
        return this.response.status(404).json({
          message: "Source not found",
        })
      }

      const sourcePolicy = this.buildSourcePolicy(source)
      if (!sourcePolicy.show()) {
        return this.response.status(403).json({
          message: "You are not authorized to view submissions for this source",
        })
      }

      const submission = await this.loadSubmission()
      if (isNil(submission)) {
        return this.response.status(404).json({
          message: "Submission not found",
        })
      }

      const policy = this.buildPolicy(submission)
      if (!policy.show()) {
        return this.response.status(403).json({
          message: "You are not authorized to view this submission",
        })
      }

      const serializedSubmission = ShowSerializer.perform(submission)
      return this.response.json({
        submission: serializedSubmission,
        policy,
      })
    } catch (error) {
      logger.error(`Error fetching submission ${error}`, { error })
      return this.response.status(400).json({
        message: `Error fetching submission: ${error}`,
      })
    }
  }

  async create() {
    try {
      const source = await this.loadSource()
      if (isNil(source)) {
        return this.response.status(404).json({
          message: "Source not found",
        })
      }

      const sourcePolicy = this.buildSourcePolicy(source)
      if (!sourcePolicy.create()) {
        return this.response.status(403).json({
          message: "You are not authorized to create submissions for this source",
        })
      }

      const newSubmission = this.buildSubmission(source)
      const policy = this.buildPolicy(newSubmission)

      if (!policy.create()) {
        return this.response.status(403).json({
          message: "You are not authorized to create submissions",
        })
      }

      const permittedAttributes = policy.permitAttributesForCreate(this.request.body)
      const submission = await CreateService.perform(permittedAttributes, this.currentUser)
      const serializedSubmission = ShowSerializer.perform(submission)
      return this.response.status(201).json({
        submission: serializedSubmission,
        policy,
      })
    } catch (error) {
      logger.error(`Error creating submission ${error}`, { error })
      return this.response.status(422).json({
        message: `Error creating submission: ${error}`,
      })
    }
  }

  async update() {
    try {
      const submission = await this.loadSubmission()
      if (isNil(submission)) {
        return this.response.status(404).json({
          message: "Submission not found",
        })
      }

      const policy = this.buildPolicy(submission)
      if (!policy.update()) {
        return this.response.status(403).json({
          message: "You are not authorized to update this submission",
        })
      }

      const permittedAttributes = policy.permitAttributes(this.request.body)
      await submission.update(permittedAttributes)

      const serializedSubmission = ShowSerializer.perform(submission)
      return this.response.json({
        submission: serializedSubmission,
        policy,
      })
    } catch (error) {
      logger.error(`Error updating submission ${error}`, { error })
      return this.response.status(422).json({
        message: `Error updating submission: ${error}`,
      })
    }
  }

  async destroy() {
    try {
      const submission = await this.loadSubmission()
      if (isNil(submission)) {
        return this.response.status(404).json({
          message: "Submission not found",
        })
      }

      const policy = this.buildPolicy(submission)
      if (!policy.destroy()) {
        return this.response.status(403).json({
          message: "You are not authorized to delete this submission",
        })
      }

      await submission.destroy()
      return this.response.status(204).send()
    } catch (error) {
      logger.error(`Error deleting submission ${error}`, { error })
      return this.response.status(422).json({
        message: `Error deleting submission: ${error}`,
      })
    }
  }

  private loadSource() {
    return Source.findByPk(this.params.sourceId)
  }

  private buildSourcePolicy(source: Source) {
    return new SourcePolicy(this.currentUser, source)
  }

  private loadSubmission() {
    return Submission.findByPk(this.params.submissionId, {
      include: [
        {
          association: "source",
          attributes: [],
          where: {
            id: this.params.sourceId,
          },
        },
      ],
    })
  }

  private buildSubmission(source: Source) {
    const submission = Submission.build({
      ...this.request.body,
      sourceId: source.id,
    })
    submission.source = source
    return submission
  }

  private buildPolicy(submission: Submission) {
    return new SubmissionsPolicy(this.currentUser, submission)
  }
}

export default SubmissionsController
