import { Result } from '@badrap/result';
import {
  Role, UserIdSubpageIdType, userHasNotPermissionError, roleDoesNotExistError, RoleUpdateType,
  oldDataError, roleWasDeletedError,
} from '../../../models';
import client from '../../client';
import { PrismaTransactionHandle } from '../../common/types';
import logger from '../../../log/log';

const findRole = (
  data: RoleUpdateType,
  { subpageId }: UserIdSubpageIdType,
  tx: PrismaTransactionHandle,
) => tx.role.findFirst({
  where: { userId: data.userId, subpageId },
});

const roleUpdate = (
  data: RoleUpdateType,
  id: string,
  tx: PrismaTransactionHandle,
) => tx.role.update({
  where: { id },
  data: { roleType: data.newRole },
});

const update = async (
  data: RoleUpdateType,
  params: UserIdSubpageIdType,
): Promise<Result<Role>> => {
  try {
    logger.debug({ subpage: { role: { update: 'start' } } });
    return await client.$transaction(async (tx: PrismaTransactionHandle) => {
      if (await tx.role.findFirst({ where: { ...params } }) === null) {
        throw userHasNotPermissionError;
      }

      const oldRole = await findRole(data, params, tx);
      if (oldRole === null) {
        throw roleDoesNotExistError;
      } if (oldRole.roleType !== data.oldRole) {
        throw oldDataError;
      } if (oldRole.deletedAt !== null) {
        throw roleWasDeletedError;
      }

      const { deletedAt, ...role } = await roleUpdate(data, oldRole.id, tx);
      logger.debug({ subpage: { role: { update: 'successfull done' } } });
      return Result.ok(role);
    });
  } catch (e) {
    logger.debug({ subpage: { role: { update: 'error' } } });
    return Result.err(e as Error);
  }
};

export default update;
