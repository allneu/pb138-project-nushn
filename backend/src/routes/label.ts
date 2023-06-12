import { Router } from 'express';
import CommonController from '../controllers/common';

const labelRouter = Router();

const labelRouteGeneric = '/subpage/:subpageId/label';
const labelRouteSpecific = `${labelRouteGeneric}/:labelId`;
const labelRouteOrder = '/subpage/:subpageId/label/order';

// Get subpage Labels
// GET /subpage/{subpageId}/labels
labelRouter.get(labelRouteGeneric, CommonController.endpointNotImplemented);

// Create Label
// POST /subpage/{subpageId}/label
labelRouter.post(labelRouteGeneric, CommonController.endpointNotImplemented);

// Update specific Label
// PATCH /subpage/{subpageId}/label/{labelId}
labelRouter.patch(labelRouteSpecific, CommonController.endpointNotImplemented);

// Update Labels order in subpage
// PATCH /subpage/{subpageId}/label/order
labelRouter.patch(labelRouteOrder, CommonController.endpointNotImplemented);

// Delete Label
// DELETE /subpage/{subpageId}/label/{labelId}
labelRouter.delete(labelRouteSpecific, CommonController.endpointNotImplemented);

export default labelRouter;
