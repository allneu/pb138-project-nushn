import { Result } from '@badrap/result';
import client from '../client';
import { userWasDeletedError } from '../../models';
import { User } from '../../models/userModels';
import userSelect from '../common/user';

export const auth = async (id: string): Promise<Result<User>> => {
  try {
    return await client.$transaction(async (tx) => {
      const { deletedAt, ...user } = await tx.user.findUniqueOrThrow({
        where: { id },
        select: {
          ...userSelect,
          deletedAt: true,
        },
      });
      if (deletedAt) {
        throw userWasDeletedError;
      }
      return Result.ok(user);
    });
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default auth;
