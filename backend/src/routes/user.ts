import { Router } from 'express';
import UserController from '../controllers/user';
import auth from '../middleware/authMiddleware';

const userRouter = Router();

const userRouteGeneric = '/user';
const userRouteAuth = `${userRouteGeneric}/auth`;
const userRouteLogIn = `${userRouteGeneric}/login`;
const userRouteLogOut = `${userRouteGeneric}/logout`;
const userRouteSpecific = `${userRouteGeneric}/:userId`;
const userRouteGetMultiple = `${userRouteGeneric}/count/:count`;
const userRouteGetMultipleWithUsername = `${userRouteGetMultiple}/username`;
const userRouteSeachr = `${userRouteGetMultipleWithUsername}/:username`;

// Auth User
// GET /user/auth
userRouter.get(userRouteAuth, UserController.auth);

// Get all Users
// GET /user/count/{count}/
userRouter.get(userRouteGetMultiple, UserController.getMultiple);
// GET /user/count/{count}/username
userRouter.get(userRouteGetMultipleWithUsername, UserController.getMultiple);
// GET /user/count/{count}/username/{username}
userRouter.get(userRouteSeachr, UserController.getMultiple);

// Get User
// GET /user/{userId}
userRouter.get(userRouteSpecific, auth(), UserController.getOne);

// Create User
// POST /user
userRouter.post(userRouteGeneric, UserController.create);

// Update User
// PATCH /user/{userId}
userRouter.patch(userRouteSpecific, auth(), UserController.update);

// Delete User
// DELETE /user/{userId}
userRouter.delete(userRouteSpecific, auth(), UserController.delete);

// Log in User
// POST /user/login
userRouter.post(userRouteLogIn, UserController.login);

// Log out User
// POST /user/logout
userRouter.post(userRouteLogOut, auth(), UserController.logout);

export default userRouter;
