import path from "path"
import fs from "fs"

import { Router, type Request, type Response, ErrorRequestHandler, NextFunction } from "express"
import { UnauthorizedError } from "express-jwt"
import { template } from "lodash"

import { APPLICATION_NAME, GIT_COMMIT_HASH, NODE_ENV, RELEASE_TAG } from "@/config"
import migrator from "@/db/migrator"

import jwtMiddleware from "@/middlewares/jwt-middleware"
import { ensureAndAuthorizeCurrentUser } from "@/middlewares/authorization-middleware"

import {
  CurrentUserController,
  DashboardController,
  DirectoryController,
  DirectorySyncController,
  MakeMeSystemAdminController,
  NotificationsController,
  OrganizationController,
  Organizations,
  OrganizationsController,
  PositionActionsController,
  PositionsController,
  PositionTeamsController,
  PreferenceController,
  RoleController,
  SharePointFolders,
  SharePointFoldersController,
  TeamActionsController,
  TeamController,
  TeamsController,
  UserActionsController,
  UserController,
  UserPositionController,
  Users,
  UsersController,
  UserTeamsController,
  WorkflowActionsController,
  WorkflowCategoriesController,
  WorkflowControllerLegacy,
  WorkflowHistoriesController,
  WorkflowPlayers,
  WorkflowPlayersController,
  Workflows,
  WorkflowsController,
  WorkflowStepPlayersController,
  WorkflowSteps,
  WorkflowStepsController,
  WorkflowStepUsersController,
} from "@/controllers"

import { logger } from "@/utils/logger"

export const router = Router()

// non-api (no authentication is required) routes
router.route("/_status").get((_req: Request, res: Response) => {
  return res.json({
    RELEASE_TAG,
    GIT_COMMIT_HASH,
  })
})

// api routes
router.use("/api", jwtMiddleware, ensureAndAuthorizeCurrentUser)

router.use("/migrate", migrator.migrationRouter)

// Add all the standard api controller routes here

router.route("/api/current-user").get(CurrentUserController.show)

router.route("/api/notifications").get(NotificationsController.index)
router
  .route("/api/notifications/:id")
  .get(NotificationsController.show)
  .patch(NotificationsController.update)

router
  .route("/api/organizations")
  .get(OrganizationsController.index)
  .post(OrganizationsController.create)
router
  .route("/api/organizations/:organizationId")
  .get(OrganizationsController.show)
  .patch(OrganizationsController.update)
  .delete(OrganizationsController.destroy)

router.route("/api/organization").get(OrganizationController.index)
router
  .route("/api/organization/:id")
  .get(OrganizationController.show)
  .patch(OrganizationController.update)
router
  .route("/api/organizations/:organizationId/positions")
  .get(Organizations.PositionsController.index)

router.route("/api/team/search").post(TeamController.index)
router.route("/api/team").post(TeamController.create)
router.route("/api/team/:id").get(TeamController.show)
router.route("/api/team/:id").put(TeamController.update)

router.route("/api/teams").get(TeamsController.index).post(TeamsController.create)
router
  .route("/api/teams/:id")
  .get(TeamsController.show)
  .patch(TeamsController.update)
  .delete(TeamsController.destroy)

router
  .route("/api/position-actions")
  .get(PositionActionsController.index)
  .post(PositionActionsController.create)
router
  .route("/api/position-actions/:id")
  .get(PositionActionsController.show)
  .patch(PositionActionsController.update)
  .delete(PositionActionsController.destroy)

router.route("/api/positions").get(PositionsController.index).post(PositionsController.create)
router
  .route("/api/positions/:positionId")
  .get(PositionsController.show)
  .patch(PositionsController.update)
  .delete(PositionsController.destroy)

router
  .route("/api/position-teams")
  .get(PositionTeamsController.index)
  .post(PositionTeamsController.create)
router
  .route("/api/position-teams/:positionTeamId")
  .get(PositionTeamsController.show)
  .patch(PositionTeamsController.update)
  .delete(PositionTeamsController.destroy)

router.route("/api/preference/:id").get(PreferenceController.show)
router.route("/api/preference/:id").put(PreferenceController.update)
router.route("/api/preference/:id").put(PreferenceController.destroy)

router.route("/api/role/:id").get(RoleController.show)
router.route("/api/role/:id").put(RoleController.update)
router.route("/api/role/:id").put(RoleController.destroy)

router.route("/api/share-point-folders").get(SharePointFoldersController.index)
router
  .route("/api/share-point-folders/:sharePointFolderId/access")
  .post(SharePointFolders.AccessController.create)
router
  .route("/api/share-point-folders/:sharePointFolderId/files")
  .get(SharePointFolders.FilesController.index)
router
  .route("/api/share-point-folders/:sharePointFolderId/files/:sharePointFileId/access")
  .post(SharePointFolders.Files.AccessController.create)

router
  .route("/api/team-actions")
  .get(TeamActionsController.index)
  .post(TeamActionsController.create)
router
  .route("/api/team-actions/:id")
  .get(TeamActionsController.show)
  .patch(TeamActionsController.update)
  .delete(TeamActionsController.destroy)

router
  .route("/api/user-actions")
  .get(UserActionsController.index)
  .post(UserActionsController.create)
router
  .route("/api/user-actions/:id")
  .get(UserActionsController.show)
  .patch(UserActionsController.update)
  .delete(UserActionsController.destroy)

router.route("/api/user").get(UserController.index)
router.route("/api/user").post(UserController.create)
router.route("/api/user/:id").get(UserController.show)
router.route("/api/user/:id").put(UserController.update)

router.route("/api/users").get(UsersController.index).post(UsersController.create)
router
  .route("/api/users/:id")
  .get(UsersController.show)
  .patch(UsersController.update)
  .delete(UsersController.destroy)
router.route("/api/users/:userId/directory-sync").post(Users.DirectorySyncController.create)

router.route("/api/user-position").post(UserPositionController.create)
router.route("/api/user-position/user/:userId").get(UserPositionController.show)
router.route("/api/user-position/position/:positionId").get(UserPositionController.show)
router.route("/api/user-position/:id").put(UserPositionController.update)
router.route("/api/user-position/:id").delete(UserPositionController.destroy)

router.route("/api/user-teams").get(UserTeamsController.index).post(UserTeamsController.create)
router
  .route("/api/user-teams/:userTeamId")
  .get(UserTeamsController.show)
  .patch(UserTeamsController.update)
  .delete(UserTeamsController.destroy)

router
  .route("/api/workflow-actions")
  .get(WorkflowActionsController.index)
  .post(WorkflowActionsController.create)
router
  .route("/api/workflow-actions/:id")
  .get(WorkflowActionsController.show)
  .patch(WorkflowActionsController.update)
  .delete(WorkflowActionsController.destroy)

router
  .route("/api/workflow-categories")
  .get(WorkflowCategoriesController.index)
  .post(WorkflowCategoriesController.create)
router
  .route("/api/workflow-categories/:id")
  .get(WorkflowCategoriesController.show)
  .patch(WorkflowCategoriesController.update)
  .delete(WorkflowCategoriesController.destroy)

router.route("/api/workflows").get(WorkflowsController.index).post(WorkflowsController.create)
router.route("/api/workflows/potential-players").get(Workflows.PotentialPlayersController.index)
router
  .route("/api/workflows/:id")
  .get(WorkflowsController.show)
  .patch(WorkflowsController.update)
  .delete(WorkflowsController.destroy)

router
  .route("/api/workflows-legacy")
  .get(WorkflowControllerLegacy.index)
  .post(WorkflowControllerLegacy.create)
router.route("/api/workflows-legacy/:id").get(WorkflowControllerLegacy.show)

router.route("/api/workflows/:workflowId/histories").get(Workflows.HistoriesController.index)
router.route("/api/workflows/:workflowId/players").get(Workflows.PlayersController.index)
router.route("/api/workflows/:workflowId/step-players").get(Workflows.StepPlayersController.index)
router.route("/api/workflows/:workflowId/step-users").get(Workflows.StepUsersController.index)
router.route("/api/workflows/:workflowId/steps").get(Workflows.StepsController.index)
router
  .route("/api/workflows/:workflowId/re-order-steps")
  .post(WorkflowSteps.ReOrderController.create)

// Workflow state management routes
router.route("/api/workflows/:workflowId/publish").post(Workflows.PublishController.create)

router
  .route("/api/workflow-histories")
  .get(WorkflowHistoriesController.index)
  .post(WorkflowHistoriesController.create)
router
  .route("/api/workflow-histories/:id")
  .get(WorkflowHistoriesController.show)
  .patch(WorkflowHistoriesController.update)
  .delete(WorkflowHistoriesController.destroy)

router.route("/api/workflow-players/search").post(WorkflowPlayers.SearchController.create)
router
  .route("/api/workflow-players")
  .get(WorkflowPlayersController.index)
  .post(WorkflowPlayersController.create)
router
  .route("/api/workflow-players/:id")
  .get(WorkflowPlayersController.show)
  .patch(WorkflowPlayersController.update)
  .delete(WorkflowPlayersController.destroy)

router
  .route("/api/workflow-steps")
  .get(WorkflowStepsController.index)
  .post(WorkflowStepsController.create)
router
  .route("/api/workflow-steps/:id")
  .get(WorkflowStepsController.show)
  .patch(WorkflowStepsController.update)
  .delete(WorkflowStepsController.destroy)

// Workflow Step state management routes
router
  .route("/api/workflow-steps/:workflowStepId/complete")
  .post(WorkflowSteps.CompleteController.create)
router
  .route("/api/workflow-steps/:workflowStepId/revert")
  .post(WorkflowSteps.RevertController.create)
router
  .route("/api/workflow-steps/:workflowStepId/reject")
  .post(WorkflowSteps.RejectController.create)

// Workflow Step special action routes
router
  .route("/api/workflow-steps/:workflowStepId/re-assign")
  .post(WorkflowSteps.ReAssignController.create)

router
  .route("/api/workflow-step-players")
  .get(WorkflowStepPlayersController.index)
  .post(WorkflowStepPlayersController.create)
router
  .route("/api/workflow-step-players/:id")
  .get(WorkflowStepPlayersController.show)
  .patch(WorkflowStepPlayersController.update)
  .delete(WorkflowStepPlayersController.destroy)

router
  .route("/api/workflow-step-users")
  .get(WorkflowStepUsersController.index)
  .post(WorkflowStepUsersController.create)
router
  .route("/api/workflow-step-users/:id")
  .get(WorkflowStepUsersController.show)
  .patch(WorkflowStepUsersController.update)
  .delete(WorkflowStepUsersController.destroy)

router.route("/api/directory-sync").post(DirectorySyncController.create)
router.route("/api/directory-sync").patch(DirectorySyncController.update)

router.route("/api/directory").get(DirectoryController.index)
router.route("/api/directory/:id").patch(DirectoryController.update)

router.route("/api/dashboard").get(DashboardController.index)

router.route("/api/make-me-system-admin").post(MakeMeSystemAdminController.create)

// if no other routes match, return a 404
router.use("/api", (_req: Request, res: Response) => {
  return res.status(404).json({ message: "Not Found" })
})

// Special error handler for all api errors
// See https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
router.use("/api", (err: ErrorRequestHandler, _req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err)
  }

  if (err instanceof UnauthorizedError) {
    logger.error(err)
    return res.status(err.status).json({ message: err.inner.message })
  }

  /* if (err instanceof DatabaseError) {
    logger.error(err)
    return res.status(422).json({ message: "Invalid query against database." })
  }
 */
  logger.error(err)
  return res.status(500).json({ message: "Internal Server Error" })
})

// if no other non-api routes match, send the pretty 404 page
if (NODE_ENV == "development") {
  router.use("/", (_req: Request, res: Response) => {
    const templatePath = path.resolve(__dirname, "web/404.html")
    try {
      const templateString = fs.readFileSync(templatePath, "utf8")
      const compiledTemplate = template(templateString)
      const result = compiledTemplate({
        applicationName: APPLICATION_NAME,
        releaseTag: RELEASE_TAG,
        gitCommitHash: GIT_COMMIT_HASH,
      })
      return res.status(404).send(result)
    } catch (error) {
      logger.error(error)
      return res.status(500).send(`Error building 404 page: ${error}`)
    }
  })
}

export default router
