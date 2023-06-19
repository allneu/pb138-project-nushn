import { Router } from 'express';
import UserController from '../controllers/user';
import auth from '../middleware/authMiddleware';

const userRouter = Router();

const userRouteGeneric = '/user';
const userRouteLogIn = `${userRouteGeneric}/login`;
const userRouteLogOut = `${userRouteGeneric}/logout`;
const userRouteSpecific = `${userRouteGeneric}/:userId`;

// Get all Users
// GET /user
userRouter.get(userRouteGeneric, auth(), UserController.getMultiple);

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
userRouter.delete(userRouteSpecific, auth(), UserController.deleteUser);

// Log in User
// POST /user/login
userRouter.post(userRouteLogIn, UserController.login);

// Log out User
// POST /user/logout
userRouter.post(userRouteLogOut, auth(), UserController.logout);

export default userRouter;
