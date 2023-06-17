import { Result } from '@badrap/result';
import type { User } from '@prisma/client';
import client from '../client';
import { checkUser } from '../common/common';
import { UserDeleteData } from '../../controllers/user/delete';

const deleteUser = async (data: UserDeleteData) => {
  try {
    return await client.$transaction(async (tx) => {
      const deletedAt = new Date();
      const userExists = await checkUser(data.userId, tx);
      if (userExists.isErr) {
        return Result.err(userExists.error);
      }
      const deleted: User = await tx.user.update({
        where: { id: data.userId },
        data: {
          deletedAt,
        },
      });
      return Result.ok(deleted.userName);
    });
  } catch (e) {
    return Result.err(new Error('There was a problem deleting user'));
  }
};

export default deleteUser;
