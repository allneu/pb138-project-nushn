import { Router } from 'express';
import TaskController from '../controllers/task';
import auth from '../middleware/authMiddleware';

const taskRouter = Router();

const taskRouteGeneric = '/subpage/:subpageId/task';
const taskRouteSpecific = `${taskRouteGeneric}/:taskId`;

// Get Tasks from subpage
// GET /subpage/{subpageId}/task
taskRouter.get(taskRouteGeneric, auth(), TaskController.getMultiple);

// Get specific Task
// GET /subpage/{subpageId}/task/{taskId}
taskRouter.get(taskRouteSpecific, auth(), TaskController.getOne);

// Create Task
// POST /subpage/{subpageId}/task
taskRouter.post(taskRouteGeneric, auth(), TaskController.create);

// Update specific Task
// PATCH /subpage/{subpageId}/task/{taskId}
taskRouter.patch(taskRouteSpecific, auth(), TaskController.update);

// Delete specific Task
// DELETE /subpage/{subpageId}/task/{taskId}
taskRouter.delete(taskRouteSpecific, auth(), TaskController.delete);

export default taskRouter;
