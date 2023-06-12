import { Router } from 'express';
import CommonController from '../controllers/common';

const commentRouter = Router();

const commentRouteGeneric = '/subpage/:subpageId/task/:taskId/comment';
const commentRouteSpecific = `${commentRouteGeneric}/:commentId`;

// Create Comment
// POST /subpage/{subpageId}/task/{taskId}/comment
commentRouter.post(commentRouteGeneric, CommonController.endpointNotImplemented);

// Update Comment
// PATCH /subpate/{subpageId}/task/{taskId}/comment/{commentId}
commentRouter.patch(commentRouteSpecific, CommonController.endpointNotImplemented);

// Delete Comment
// DELETE /subpate/{subpageId}/task/{taskId}/comment/{commentId}
commentRouter.delete(commentRouteSpecific, CommonController.endpointNotImplemented);

export default commentRouter;
