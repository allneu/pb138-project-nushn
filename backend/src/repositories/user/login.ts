/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
import { Result } from '@badrap/result';
import client from '../client';
import { UserLoginType } from '../../models/userModels';
import { checkUser } from '../common/common';

export const login = async (data: UserLoginType) => {
  try {
    return await client.$transaction(async (tx) => {
      const argon2 = require('argon2');
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
