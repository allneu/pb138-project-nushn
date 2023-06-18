import create from './create';
import deleteSubpage from './delete';
import { getMultiple, getOne } from './get';
import update from './update';
import RoleRepo from './role';

export default {
  create,
  delete: deleteSubpage,
  getOne,
  getMultiple,
  update,
  RoleRepo,
};
