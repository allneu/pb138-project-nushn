import { Router } from 'express';
import LabelController from '../controllers/label';
import auth from '../middleware/authMiddleware';

const labelRouter = Router();

const labelRouteGeneric = '/subpage/:subpageId/label';
const labelRouteSpecific = `${labelRouteGeneric}/:labelId`;

// Get subpage Labels
// GET /subpage/{subpageId}/label
labelRouter.get(labelRouteGeneric, auth(), LabelController.get);

// Create Label
// POST /subpage/{subpageId}/label
labelRouter.post(labelRouteGeneric, auth(), LabelController.create);

// Update specific Label
// PATCH /subpage/{subpageId}/label/{labelId}
labelRouter.patch(labelRouteSpecific, auth(), LabelController.update);

// Delete Label
// DELETE /subpage/{subpageId}/label/{labelId}
labelRouter.delete(labelRouteSpecific, auth(), LabelController.deleteLabel);

export default labelRouter;
