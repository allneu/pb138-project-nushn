/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import { Result } from '@badrap/result';
import type { User } from '@prisma/client';
import client from '../client';
import { UserUpdateData } from '../../controllers/user/update';
import { checkUser } from '../common/common';

const update = async (data: UserUpdateData) => {
  try {
    return await client.$transaction(async (tx) => {
      const userExists = await checkUser(data.userId, tx);
      if (userExists.isErr) {
        return Result.err(userExists.error);
      }
      const existingUser = await tx.user.findFirstOrThrow({
        where: { id: data.userId },
      });
      const userName = data.userName ? data.userName : existingUser.userName;
      const email = data.email ? data.email : existingUser.email;
      const avatar = data.avatar ? data.avatar : existingUser.avatar;
      if (data.password !== null) {
        // eslint-disable-next-line import/no-extraneous-dependencies
        const bcryptjs = require('bcryptjs');
        const salt = await bcryptjs.genSalt();
        const hashedPassword = await bcryptjs.hash(data.password, salt);
        const updated: User = await tx.user.update({
          where: { id: data.userId },
          data: {
            userName,
            email,
            hashedPassword,
            salt,
            avatar,
          },
        });
        return Result.ok(updated);
      }
      await tx.user.update({
        where: { id: data.userId },
        data: {
          userName,
          email,
          avatar,
        },
      });
      return Result.ok({
        id: data.userId,
        userName: data.userName,
        email: data.email,
        avatar: data.avatar,
      });
    });
  } catch {
    return Result.err(new Error('There was a problem updating User'));
  }
};
export default update;
