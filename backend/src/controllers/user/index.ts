import create from './create';
import deleteUser from './delete';
import { getMultiple, getOne } from './get';
import { update } from './update';
import { login } from './login';
import { logout } from './logout';
import { auth } from './auth';

export default {
  create,
  delete: deleteUser,
  getOne,
  getMultiple,
  update,
  login,
  logout,
  auth,
};
