import { Result } from '@badrap/result';
import type { User } from '@prisma/client';
import argon2 from 'argon2';
import client from '../client';
import { UserUpdateResult, UserUpdateType } from '../../models/userModels';
import { checkUser } from '../common/common';
import { UserIdType } from '../../models/urlParamsSchema';

const update = async (data: UserUpdateType & UserIdType):
Promise<Result<UserUpdateResult>> => {
  try {
    return await client.$transaction(async (tx) => {
      const userExists = await checkUser(data.userId, tx);
      if (userExists.isErr) {
        return Result.err(userExists.error);
      }
      const username = data.username ? { username: data.username } : {};
      const email = data.email ? { email: data.email } : {};
      const avatar = data.avatar ? { avatar: data.avatar } : {};
      if (data.newPassword !== undefined) {
        const oldPasswordData = await tx.user.findFirstOrThrow({
          where: { id: data.userId },
        });
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (!await argon2.verify(oldPasswordData?.hashedPassword, data.oldPassword!)) {
          throw new Error();
        }
        const hashedPassword = await argon2.hash(data.newPassword);
        const updated: User = await tx.user.update({
          where: { id: data.userId },
          data: {
            ...username,
            ...email,
            hashedPassword,
            ...avatar,
          },
        });
        return Result.ok(updated);
      }
      const result = await tx.user.update({
        where: { id: data.userId },
        data: {
          ...username,
          ...email,
          ...avatar,
        },
        select: {
          id: true,
          username: !!data.username,
          email: !!data.email,
          avatar: !!data.avatar,
        },
      });
      return Result.ok(result);
    });
  } catch {
    return Result.err(new Error('There was a problem updating User'));
  }
};
export default update;
