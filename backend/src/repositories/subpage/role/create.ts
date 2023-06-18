import { Result } from '@badrap/result';
import {
  Role,
  RoleCreateType,
  UserIdSubpageIdType,
  subpageWasDeletedError,
  userHasNotPermissionError,
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
        if (await tx.role.findFirst({ where: { ...params } }) === null) {
          throw userHasNotPermissionError;
        }
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
