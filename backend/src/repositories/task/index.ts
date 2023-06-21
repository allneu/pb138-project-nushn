import create from './create';
import deleteTask from './delete';
import { getMultiple, getOne } from './get';
import update from './update';

export default {
  create,
  delete: deleteTask,
  getOne,
  getMultiple,
  update,
};
