import { Result } from '@badrap/result';
import {
  Subpage,
  SubpageCreateType, UserIdType, labelSelect, subpageSelect, userWasDeletedError,
} from '../../models';
import client from '../client';
import { PrismaTransactionHandle } from '../common/types';
import roleCreate from '../common/role';
import logger from '../../log/log';

const create = async (
  data: SubpageCreateType,
  params: UserIdType,
): Promise<Result<Subpage>> => {
  logger.debug({ subpage: { create: 'start' } });
  try {
    return await client.$transaction(async (tx: PrismaTransactionHandle) => {
      const subpage = await tx.subPage.create({
        data,
        select: {
          ...subpageSelect,
          labels: { select: labelSelect },
        },
      });
      const role = await roleCreate({ role: 'OWNER', userId: params.userId }, { ...params, subpageId: subpage.id }, tx);
      if (role.user.deletedAt) {
        throw userWasDeletedError;
      }
      const label = await tx.label.create({
        data: {
          name: 'unlabeled',
          subPageId: subpage.id,
          orderInSubpage: 0,
        },
        select: labelSelect,
      });
      subpage.labels = [...subpage.labels, label];
      logger.debug({ subpage: { create: 'successfull done' } });
      return Result.ok(subpage);
    });
  } catch (e) {
    logger.debug({ subpage: { create: 'error' } });
    return Result.err(e as Error);
  }
};

export default create;
