import { Result } from '@badrap/result';
import argon2 from 'argon2';
import client from '../client';
import { UserLoginType } from '../../models/userModels';
import { checkUser } from '../common/common';
import { invalidPasswordError } from '../../models';

export const login = async (data: UserLoginType) => {
  try {
    return await client.$transaction(async (tx) => {
      const findUser = await tx.user.findUniqueOrThrow({
        where: { email: data.email },
      });
      await checkUser(findUser.id, tx);
      const checkPassword = await argon2.verify(findUser.hashedPassword, data.password);
      if (!checkPassword) {
        throw invalidPasswordError;
      }
      return Result.ok({});
    });
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default login;
