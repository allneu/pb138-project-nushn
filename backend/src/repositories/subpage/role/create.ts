import { Result } from '@badrap/result';
import {
  Role,
  RoleCreateType,
  UserIdSubpageIdType,
  subpageWasDeletedError,
  userWasDeletedError,
} from '../../../models';
import client from '../../client';
import { PrismaTransactionHandle } from '../../common/types';
import roleCreate from '../../common/role';

const create = async (
  data: RoleCreateType,
  params: UserIdSubpageIdType,
): Promise<Result<Role>> => {
  try {
    return Result.ok(
      await client.$transaction(async (tx: PrismaTransactionHandle) => {
        const { user, subpage, ...role } = await roleCreate(data, params, tx);
        if (user.deletedAt !== null) {
          throw userWasDeletedError;
        } if (subpage.deletedAt !== null) {
          throw subpageWasDeletedError;
        }
        return role;
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};
export default create;
