import { Result } from '@badrap/result';
import { Deleted, UserIdSubpageIdType, notimplementedError } from '../../models';

const deleteSubpage = async (data: UserIdSubpageIdType): Promise<Result<Deleted>> => (
  data ? Result.err(notimplementedError) : Result.err(notimplementedError));

export default deleteSubpage;
