import { Result } from '@badrap/result';
import client from '../client';
import {
  UserGetSpecificType, User, UserGetMultipleType, UserGetMultipleResultBody,
} from '../../models/userModels';
import { checkUser } from '../common/common';
import userSelect from '../common/user';

export const getOne = async (data: UserGetSpecificType):
Promise<Result<User>> => {
  try {
    return await client.$transaction(async (tx) => {
      const userFlag = await checkUser(data.userId, tx);
      if (userFlag.isErr) {
        throw userFlag.error;
      }
      const user = await tx.user.findFirstOrThrow({
        where: { id: data.userId },
        select: userSelect,
      });
      return Result.ok(user);
    });
  } catch (e) {
    return Result.err(e as Error);
  }
};

export const getMultiple = async (
  { username, count }: UserGetMultipleType,
): Promise<Result<UserGetMultipleResultBody>> => {
  try {
    return await client.$transaction(async (tx) => {
      const users = await tx.user.findMany({
        where: { username: { contains: username }, deletedAt: null },
        orderBy: { username: 'asc' },
        take: count,
        select: userSelect,
      });
      return Result.ok(users);
    });
  } catch (e) {
    return Result.err(e as Error);
  }
};
