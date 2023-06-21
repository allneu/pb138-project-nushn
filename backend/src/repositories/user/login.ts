import { Result } from '@badrap/result';
import argon2 from 'argon2';
import client from '../client';
import { UserLoginType } from '../../models/userModels';
import { checkUser } from '../common/common';

export const login = async (data: UserLoginType) => {
  try {
    return await client.$transaction(async (tx) => {
      const findUser = await tx.user.findUniqueOrThrow({
        where: { email: data.email },
      });
      await checkUser(findUser.id, tx);
      const checkPassword = argon2.verify(findUser.hashedPassword, data.password);
      if (!checkPassword) {
        return Result.err(new Error('Wrong password'));
      }
      return Result.ok({});
    });
  } catch {
    return Result.err(new Error('There was a problem logging in'));
  }
};

export default login;
