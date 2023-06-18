import { Result } from '@badrap/result';
import client from '../client';
import { checkUser } from '../common/common';
import { UserDeleteType } from '../../models/userModels';
import { Deleted } from '../../models/common';

const deleteUser = async (data: UserDeleteType): Promise<Result<Deleted>> => {
  try {
    return await client.$transaction(async (tx) => {
      const deletedAt = new Date();
      const userExists = await checkUser(data.userId, tx);
      if (userExists.isErr) {
        return Result.err(userExists.error);
      }
      await tx.user.update({
        where: { id: data.userId },
        data: {
          deletedAt,
        },
      });
      return Result.ok({});
    });
  } catch (e) {
    return Result.err(new Error('There was a problem deleting user'));
  }
};

export default deleteUser;
