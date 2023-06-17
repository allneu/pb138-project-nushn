import { Result } from '@badrap/result';
import client from '../client';
import { UserGetData, User } from '../../controllers/user/get';
import { checkUser } from '../common/common';

const getOne = async (data: UserGetData): Promise<Result<User>> => {
  try {
    return await client.$transaction(async (tx) => {
      const userFlag = await checkUser(data.userId, tx);
      if (userFlag.isErr) {
        return Result.err(userFlag.error);
      }
      const user = await tx.user.findFirstOrThrow({
        where: { id: data.userId },
      });
      const returnedUser = { id: user.id, userName: user.userName, email: user.email };
      return Result.ok(returnedUser);
    });
  } catch {
    return Result.err(new Error('There was a problem getting specific user'));
  }
};

export default getOne;
