/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import { Result } from '@badrap/result';
import type { User } from '@prisma/client';
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
      if (data.password !== undefined) {
        // eslint-disable-next-line import/no-extraneous-dependencies
        const argon2 = require('argon2');
        const hashedPassword = await argon2.hash(data.password);
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
