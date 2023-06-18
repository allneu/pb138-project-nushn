import { Router } from 'express';
import SubpageController from '../controllers/subpage';

const subpageRouter = Router();

const subpageRouteGeneric = '/user/:userId/subpage';
const subpageRouteSpecific = `${subpageRouteGeneric}/:subpageId`;
const subpageRouteRole = `${subpageRouteSpecific}/:role`;

// Get all user Subpages
// GET /user/{userId}/subpage
subpageRouter.get(subpageRouteGeneric, SubpageController.getMultiple);

// Get Subpage
// GET /user/{userId}/subpage/{subpageId}
subpageRouter.get(subpageRouteSpecific, SubpageController.getOne);

// Create Subpage
// POST /user/{userId}/subpage
subpageRouter.post(subpageRouteGeneric, SubpageController.create);

// Update specific Subpage
// PATCH /user/{userid}/subpage/{subpageId}
subpageRouter.patch(subpageRouteSpecific, SubpageController.update);

// Delete Subpage
// DELETE /user/{userid}/subpage/{subpageId}
subpageRouter.delete(subpageRouteSpecific, SubpageController.delete);

// Share Subpage = Create Role
// POST /user/{userid}/subpage/{subpageId}/role
subpageRouter.post(subpageRouteRole, SubpageController.RoleController.create);

// Update Role
// PATCH /user/{userid}/subpage/{subpageId}/role
subpageRouter.patch(subpageRouteRole, SubpageController.RoleController.update);

// Delete Role
// DELETE /user/{userid}/subpage/{subpageId}/role
subpageRouter.delete(subpageRouteRole, SubpageController.RoleController.delete);

export default subpageRouter;
