import { Result } from '@badrap/result';
import { Deleted, UserIdSubpageIdType, notimplementedError } from '../../../models';

const deleteRole = async (params : UserIdSubpageIdType): Promise<Result<Deleted>> => (
  params ? Result.err(notimplementedError) : Result.err(notimplementedError));

export default deleteRole;
