import { Result } from '@badrap/result';
import client from '../client';
import {
  UserGetSpecificType, UserGetSpecificResult, UserGetMultipleType, UserGetMultipleResultBody,
} from '../../models/userModels';
import { checkUser } from '../common/common';

export const getOne = async (data: UserGetSpecificType):
Promise<Result<UserGetSpecificResult>> => {
  try {
    return await client.$transaction(async (tx) => {
      const userFlag = await checkUser(data.userId, tx);
      if (userFlag.isErr) {
        throw userFlag.error;
      }
      const user = await tx.user.findFirstOrThrow({
        where: { id: data.userId },
        select: {
          id: true,
          username: true,
          email: true,
          avatar: true,
        },
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
        select: {
          id: true,
          username: true,
          email: true,
          avatar: true,
        },
      });
      return Result.ok(users);
    });
  } catch (e) {
    return Result.err(e as Error);
  }
};
