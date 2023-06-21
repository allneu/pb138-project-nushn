import { Result } from '@badrap/result';
import client from '../client';
import { checkUser } from '../common/common';
import { UserDeleteType } from '../../models/userModels';
import { Deleted } from '../../models/common';

const deleteUser = async (data: UserDeleteType): Promise<Result<Deleted>> => {
  try {
    return await client.$transaction(async (tx) => {
      const deletedAt = new Date();
      await checkUser(data.userId, tx);
      await tx.user.update({
        where: { id: data.userId },
        data: {
          deletedAt,
        },
      });
      return Result.ok({});
    });
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default deleteUser;
