/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
import { Result } from '@badrap/result';
import { User } from '@prisma/client';
import client from '../client';
import { UserCreateResult, UserCreateType } from '../../models/userModels';

const create = async (data: UserCreateType):
Promise<Result<UserCreateResult>> => {
  try {
    return await client.$transaction(async (tx) => {
      const argon2 = require('argon2');
      const hashedPassword = await argon2.hash(data.password);
      const newUser: User = await tx.user.create({
        data: {
          username: data.username,
          email: data.email,
          hashedPassword,
          avatar: data.avatar ? data.avatar : '',
        }
      });
      const returnedUser = { id: newUser.id, username: newUser.username, email: newUser.email };
      return Result.ok(returnedUser);
    });
  } catch (e) {
    return Result.err(new Error('There was an error creating user.'));
  }
};
export default create;
