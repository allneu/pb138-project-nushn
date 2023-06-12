import { Router } from 'express';
import TaskController from '../controllers/task';

const taskRouter = Router();

const taskRouteGeneric = '/subpage/:subpageId/task';
const taskRouteSpecific = `${taskRouteGeneric}/:taskId`;

// Get Tasks from subpage
// GET /subpage/{subpageId}/task
taskRouter.get(taskRouteGeneric, TaskController.getMultiple);

// Get specific Task
// GET /subpage/{subpageId}/task/{taskId}
taskRouter.get(taskRouteSpecific, TaskController.getOne);

// Create Task
// POST /subpage/{subpageId}/task
taskRouter.post(taskRouteGeneric, TaskController.create);

// Update specific Task
// PATCH /subpage/{subpageId}/task/{taskId}
taskRouter.patch(taskRouteSpecific, TaskController.update);

// Delete specific Task
// DELETE /subpage/{subpageId}/task/{taskId}
taskRouter.delete(taskRouteSpecific, TaskController.deleteTask);

export default taskRouter;
