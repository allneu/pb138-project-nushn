import create from './create';
import deleteUser from './delete';
import { getOne, getMultiple } from './get';
import update from './update';
import { login } from './login';
import { auth } from './auth';

export default {
  create,
  delete: deleteUser,
  getOne,
  getMultiple,
  update,
  login,
  auth,
};
