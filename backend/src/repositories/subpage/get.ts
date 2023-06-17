import { Result } from '@badrap/result';
import {
  Subpage, UserIdSubpageIdType, UserIdType, notimplementedError,
} from '../../models';

export const getOne = async (data: UserIdSubpageIdType): Promise<Result<Subpage>> => (
  data ? Result.err(notimplementedError) : Result.err(notimplementedError));

export const getMultiple = async (data: UserIdType): Promise<Result<Subpage[]>> => (
  data ? Result.err(notimplementedError) : Result.err(notimplementedError));
