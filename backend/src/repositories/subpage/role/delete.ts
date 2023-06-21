import { Result } from '@badrap/result';
import { Deleted, UserIdSubpageIdType } from '../../../models';
import { PrismaTransactionHandle } from '../../common/types';
import client from '../../client';
import logger from '../../../log/log';

const roleDelete = async (
  { userId, subpageId }: UserIdSubpageIdType,
  tx: PrismaTransactionHandle,
) => {
  await tx.role.updateMany({
    where: { userId, subpageId, deletedAt: null },
    data: { deletedAt: new Date() },
  });
};

const deleteRole = async (params : UserIdSubpageIdType): Promise<Result<Deleted>> => {
  try {
    logger.debug({ subpage: { role: { delete: 'start' } } });
    return await client.$transaction(async (tx: PrismaTransactionHandle) => {
      await roleDelete(params, tx);
      logger.debug({ subpage: { role: { delete: 'successfull done' } } });
      return Result.ok({});
    });
  } catch (e) {
    logger.debug({ subpage: { role: { delete: 'error' } } });
    return Result.err(e as Error);
  }
};

export default deleteRole;
