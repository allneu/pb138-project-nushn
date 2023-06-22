import { Result } from '@badrap/result';
import {
  Role,
  RoleCreateType,
  UserIdSubpageIdType,
  subpageWasDeletedError,
  thisRoleExistError,
  userHasNotPermissionError,
  userWasDeletedError,
} from '../../../models';
import client from '../../client';
import { PrismaTransactionHandle } from '../../common/types';
import roleCreate from '../../common/role';
import logger from '../../../log/log';

const create = async (
  data: RoleCreateType,
  params: UserIdSubpageIdType,
): Promise<Result<Role>> => {
  logger.debug({ subpage: { role: { create: 'start' } } });
  try {
    return await client.$transaction(async (tx: PrismaTransactionHandle) => {
      if (await tx.role.findFirst({ where: { ...params } }) === null) {
        throw userHasNotPermissionError;
      } if (await tx.role.findFirst({
        where: { roleType: data.role, userId: data.userId, subpageId: params.subpageId },
      }) !== null) {
        throw thisRoleExistError;
      }
      const { user, subpage, ...role } = await roleCreate(data, params, tx);
      if (user.deletedAt !== null) {
        throw userWasDeletedError;
      } if (subpage.deletedAt !== null) {
        throw subpageWasDeletedError;
      }
      logger.debug({ subpage: { role: { create: 'successfull done' } } });
      return Result.ok(role);
    });
  } catch (e) {
    logger.debug({ subpage: { role: { create: 'error' } } });
    return Result.err(e as Error);
  }
};

export default create;
