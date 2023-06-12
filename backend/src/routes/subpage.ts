import { Router } from 'express';
import CommonController from '../controllers/common';

const subpageRouter = Router();

const subpageRouteGeneric = '/user/:userId/subpage';
const subpageRouteSpecific = `${subpageRouteGeneric}/:subpageId`;
const subpageRouteRole = `${subpageRouteSpecific}/:role`;

// Read Subpage
// GET /user/{userid}/subpage/{subpageId}
subpageRouter.get(subpageRouteSpecific, CommonController.endpointNotImplemented);

// Create Subpage
// POST /user/{userId}/subpage
subpageRouter.post(subpageRouteGeneric, CommonController.endpointNotImplemented);

// Update specific Subpage
// PATCH /user/{userid}/subpage/{subpageId}
subpageRouter.patch(subpageRouteSpecific, CommonController.endpointNotImplemented);

// Delete Subpage
// DELETE /user/{userid}/subpage/{subpageId}
subpageRouter.delete(subpageRouteSpecific, CommonController.endpointNotImplemented);

// Read all user Subpages
// GET /user/{userId}/subpage
subpageRouter.get(subpageRouteGeneric, CommonController.endpointNotImplemented);

// Share Subpage = Create Role
// POST /user/{userid}/subpage/{subpageId}/role
subpageRouter.post(subpageRouteRole, CommonController.endpointNotImplemented);

// Update Role
// PATCH /user/{userid}/subpage/{subpageId}/role
subpageRouter.patch(subpageRouteRole, CommonController.endpointNotImplemented);

// Delete Role
// DELETE /user/{userid}/subpage/{subpageId}/role
subpageRouter.delete(subpageRouteRole, CommonController.endpointNotImplemented);

export default subpageRouter;
