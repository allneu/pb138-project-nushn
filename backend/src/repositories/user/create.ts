import { Result } from '@badrap/result';
import argon2 from 'argon2';
import client from '../client';
import { User, UserCreateType } from '../../models/userModels';

const create = async (data: UserCreateType):
Promise<Result<User>> => {
  try {
    return await client.$transaction(async (tx) => {
      const hashedPassword = await argon2.hash(data.password);
      const newUser = await tx.user.create({
        data: {
          username: data.username,
          email: data.email,
          hashedPassword,
          avatar: data.avatar ? data.avatar : null,
        },
      });
      return Result.ok(newUser);
    });
  } catch (e) {
    return Result.err(e as Error);
  }
};
export default create;
