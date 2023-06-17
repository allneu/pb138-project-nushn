import { Result } from '@badrap/result';
import { User } from '@prisma/client';
import client from '../client';
import { UserDataCreate } from '../../controllers/user/create';

const create = async (data: UserDataCreate) => {
  try {
    return await client.$transaction(async (tx) => {
      // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
      const bcryptjs = require('bcryptjs');
      const salt = await bcryptjs.genSalt();
      const hashedPassword = await bcryptjs.hash(data.password, salt);
      const newUser: User = await tx.user.create({
        data: {
          userName: data.userName,
          email: data.email,
          hashedPassword,
          salt: salt.toString(),
          avatar: data.avatar ? data.avatar : '',
        },
      });
      const returnedUser = { id: newUser.id, userName: newUser.userName, email: newUser.email };
      return Result.ok(returnedUser);
    });
  } catch (e) {
    return Result.err(new Error('There was an error creating user.'));
  }
};
export default create;
