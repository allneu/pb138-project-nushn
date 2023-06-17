import { Result } from '@badrap/result';
import {
  RoleCreateType,
  RoleType,
  UserIdSubpageIdType,
  notimplementedError,
} from '../../../models';

const create = async (
  data: RoleCreateType,
  params: UserIdSubpageIdType,
): Promise<Result<RoleType>> => (
  data || params ? Result.err(notimplementedError) : Result.err(notimplementedError));

export default create;
