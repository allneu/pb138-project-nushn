import { Router } from 'express';
import LabelController from '../controllers/label';

const labelRouter = Router();

const labelRouteGeneric = '/subpage/:subpageId/label';
const labelRouteSpecific = `${labelRouteGeneric}/:labelId`;

// Get subpage Labels
// GET /subpage/{subpageId}/label
labelRouter.get(labelRouteGeneric, LabelController.get);

// Create Label
// POST /subpage/{subpageId}/label
labelRouter.post(labelRouteGeneric, LabelController.create);

// Update specific Label
// PATCH /subpage/{subpageId}/label/{labelId}
labelRouter.patch(labelRouteSpecific, LabelController.update);

// Delete Label
// DELETE /subpage/{subpageId}/label/{labelId}
labelRouter.delete(labelRouteSpecific, LabelController.deleteLabel);

export default labelRouter;
