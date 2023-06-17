import { Result } from '@badrap/result';
import {
  SubpageUpdateResult, SubpageUpdateType, UserIdSubpageIdType, notimplementedError,
} from '../../models';

const update = async (
  data: SubpageUpdateType,
  params: UserIdSubpageIdType,
): Promise<Result<SubpageUpdateResult>> => (
  data || params ? Result.err(notimplementedError) : Result.err(notimplementedError));

export default update;
