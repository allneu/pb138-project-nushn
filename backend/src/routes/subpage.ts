import { Router } from 'express';
import SubpageController from '../controllers/subpage';
import auth from '../middleware/authMiddleware';

const subpageRouter = Router();

const subpageRouteGeneric = '/user/:userId/subpage';
const subpageRouteSpecific = `${subpageRouteGeneric}/:subpageId`;
const subpageRouteRole = `${subpageRouteSpecific}/:role`;

// Get all user Subpages
// GET /user/{userId}/subpage
subpageRouter.get(subpageRouteGeneric, auth(), SubpageController.getMultiple);

// Get Subpage
// GET /user/{userId}/subpage/{subpageId}
subpageRouter.get(subpageRouteSpecific, auth(), SubpageController.getOne);

// Create Subpage
// POST /user/{userId}/subpage
subpageRouter.post(subpageRouteGeneric, auth(), SubpageController.create);

// Update specific Subpage
// PATCH /user/{userid}/subpage/{subpageId}
subpageRouter.patch(subpageRouteSpecific, auth(), SubpageController.update);

// Delete Subpage
// DELETE /user/{userid}/subpage/{subpageId}
subpageRouter.delete(subpageRouteSpecific, auth(), SubpageController.delete);

// Share Subpage = Create Role
// POST /user/{userid}/subpage/{subpageId}/role
subpageRouter.post(subpageRouteRole, auth(), SubpageController.RoleController.create);

// Update Role
// PATCH /user/{userid}/subpage/{subpageId}/role
subpageRouter.patch(subpageRouteRole, auth(), SubpageController.RoleController.update);

// Delete Role
// DELETE /user/{userid}/subpage/{subpageId}/role
subpageRouter.delete(subpageRouteRole, auth(), SubpageController.RoleController.delete);

export default subpageRouter;
