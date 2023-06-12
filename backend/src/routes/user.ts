import { Router } from 'express';
import CommonController from '../controllers/common';
import UserController from '../controllers/user';

const userRouter = Router();

const userRouteGeneric = '/user';
const userRouteLogIn = `${userRouteGeneric}/login`;
const userRouteLogOut = `${userRouteGeneric}/logout`;
const userRouteSpecific = `${userRouteGeneric}/:userId`;

// Get all Users
// GET /user
userRouter.get(userRouteGeneric, CommonController.endpointNotImplemented);

// Get User
// GET /user/{userId}
userRouter.get(userRouteSpecific, CommonController.endpointNotImplemented);

// Create User
// POST /user
userRouter.post(userRouteGeneric, UserController.create);

// Update User
// PATCH /user/{userId}
userRouter.patch(userRouteSpecific, CommonController.endpointNotImplemented);

// Delete User
// DELETE /user/{userId}
userRouter.delete(userRouteSpecific, CommonController.endpointNotImplemented);

// Log in User
// POST /user/login
userRouter.post(userRouteLogIn, CommonController.endpointNotImplemented);

// Log out User
// POST /user/logout
userRouter.post(userRouteLogOut, CommonController.endpointNotImplemented);

export default userRouter;
