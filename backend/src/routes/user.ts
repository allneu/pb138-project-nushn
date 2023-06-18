import { Router } from 'express';
import { endpointNotImplemented } from '../controllers/common';
import UserController from '../controllers/user';

const userRouter = Router();

const userRouteGeneric = '/user';
const userRouteLogIn = `${userRouteGeneric}/login`;
const userRouteLogOut = `${userRouteGeneric}/logout`;
const userRouteSpecific = `${userRouteGeneric}/:userId`;

// Get all Users
// GET /user
userRouter.get(userRouteGeneric, UserController.getMultiple);

// Get User
// GET /user/{userId}
userRouter.get(userRouteSpecific, UserController.getOne);

// Create User
// POST /user
userRouter.post(userRouteGeneric, UserController.create);

// Update User
// PATCH /user/{userId}
userRouter.patch(userRouteSpecific, UserController.update);

// Delete User
// DELETE /user/{userId}
userRouter.delete(userRouteSpecific, UserController.deleteUser);

// Log in User
// POST /user/login
userRouter.post(userRouteLogIn, endpointNotImplemented);

// Log out User
// POST /user/logout
userRouter.post(userRouteLogOut, endpointNotImplemented);

export default userRouter;
