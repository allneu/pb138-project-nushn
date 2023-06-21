import create from './create';
import deleteLabel from './delete';
import { get } from './get';
import { update } from './update';

export default {
  create,
  delete: deleteLabel,
  get,
  update,
};
