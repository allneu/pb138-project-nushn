import { Result } from '@badrap/result';
import {
  RoleCreateType, Role, UserIdSubpageIdType, notimplementedError,
} from '../../../models';

const update = async (
  data: RoleCreateType,
  params: UserIdSubpageIdType,
): Promise<Result<Role>> => (
  data || params ? Result.err(notimplementedError) : Result.err(notimplementedError));

export default update;
