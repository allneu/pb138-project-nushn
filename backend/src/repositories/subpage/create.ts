import { Result } from '@badrap/result';
import { Subpage, SubpageCreateType, UserIdType } from '../../models';
import { notimplementedError } from '../../models/errors';

const create = async (data: SubpageCreateType, params: UserIdType): Promise<Result<Subpage>> => (
  data || params ? Result.err(notimplementedError) : Result.err(notimplementedError));

export default create;
