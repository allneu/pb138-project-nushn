import { Result } from '@badrap/result';
import client from '../client';
import { UserGetSpecificType, UserGetSpecificResult, UserGetMultipleType } from '../../models/userModels';
import { checkUser } from '../common/common';

export const getOne = async (data: UserGetSpecificType):
Promise<Result<UserGetSpecificResult>> => {
  try {
    return await client.$transaction(async (tx) => {
      const userFlag = await checkUser(data.userId, tx);
      if (userFlag.isErr) {
        return Result.err(userFlag.error);
      }
      const user = await tx.user.findFirstOrThrow({
        where: { id: data.userId },
      });
      const returnedUser = { id: user.id, userName: user.username, email: user.email };
      return Result.ok(returnedUser);
    });
  } catch {
    return Result.err(new Error('There was a problem getting specific user'));
  }
};

export const getMultiple = async (
  { username, count }: UserGetMultipleType,
) => {
  try {
    return await client.$transaction(async (tx) => {
      const users = await tx.user.findMany({
        where: { username: { contains: username }, deletedAt: null },
        orderBy: { username: 'asc' },
        take: count,
      });
      return Result.ok(users);
    });
  } catch {
    return Result.err(new Error('There was a problem getting specific user'));
  }
};
