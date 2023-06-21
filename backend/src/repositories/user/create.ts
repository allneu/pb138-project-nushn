/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
import { Result } from '@badrap/result';
import client from '../client';
import { User, UserCreateType } from '../../models/userModels';

const create = async (data: UserCreateType):
Promise<Result<User>> => {
  try {
    return await client.$transaction(async (tx) => {
      const argon2 = require('argon2');
      const hashedPassword = await argon2.hash(data.password);
      const newUser = await tx.user.create({
        data: {
          username: data.username,
          email: data.email,
          hashedPassword,
          avatar: data.avatar ? data.avatar : '',
        },
      });
      return Result.ok(newUser);
    });
  } catch (e) {
    return Result.err(new Error('There was an error creating user.'));
  }
};
export default create;
