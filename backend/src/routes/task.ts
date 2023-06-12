import { Router } from 'express';
import CommonController from '../controllers/common';

const taskRouter = Router();

const taskRouteGeneric = '/subpage/:subpageId/task';
const taskRouteSpecific = `${taskRouteGeneric}/:taskId`;
const taskRouteOrder = `${taskRouteGeneric}/order`;
const taskRouteLabelOrder = `${taskRouteGeneric}/label/:labelId/order`;

// Get Tasks from subpage
// GET /subpage/{subpageId}/task
taskRouter.get(taskRouteGeneric, CommonController.endpointNotImplemented);

// Get specific Task
// GET /subpage/{subpageId}/task/{taskId}
taskRouter.get(taskRouteSpecific, CommonController.endpointNotImplemented);

// Create Task
// POST /subpage/{subpageId}/task
taskRouter.post(taskRouteGeneric, CommonController.endpointNotImplemented);

// Update specific Task
// PATCH /subpage/{subpageId}/task/{taskId}
taskRouter.patch(taskRouteSpecific, CommonController.endpointNotImplemented);

// Update Tasks order in subpage
// PATCH /subpage/{subpageId}/task/order
taskRouter.patch(taskRouteOrder, CommonController.endpointNotImplemented);

// Update Tasks order in label
// PATCH /subpage/{subpageId}/label/{labelId}/tasks/order
taskRouter.patch(taskRouteLabelOrder, CommonController.endpointNotImplemented);

// Delete specific Task
// DELETE /subpage/{subpageId}/task/{taskId}
taskRouter.delete(taskRouteSpecific, CommonController.endpointNotImplemented);

export default taskRouter;
