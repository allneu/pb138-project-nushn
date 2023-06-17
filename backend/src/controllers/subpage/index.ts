import RoleController from './role';
import create from './create';
import deleteSubpage from './delete';
import { getMultiple, getOne } from './get';
import update from './update';

export default {
  create,
  delete: deleteSubpage,
  getOne,
  getMultiple,
  update,
  RoleController,
};
