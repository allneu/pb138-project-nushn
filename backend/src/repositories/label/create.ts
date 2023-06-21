import { Result } from '@badrap/result';
import { LabelCreateResult, LabelCreateType } from '../../models/labelModels';
import { SubpageIdType } from '../../models/urlParamsSchema';
import client from '../client';
import { canNotCreateUnlabeled, serverInternalError, subpageDoesNotExistError } from '../../models';
import logger from '../../log/log';
import subpageEditCreate from '../common/subpageUpdate';

const create = async (
  data: LabelCreateType,
  { subpageId }: SubpageIdType,
  userId: string,
): Promise<Result<LabelCreateResult>> => {
  logger.debug({ label: { create: 'start' } });
  try {
    if (data.name === 'unlabeled') {
      throw canNotCreateUnlabeled;
    }
    return await client.$transaction(async (tx) => {
      const subpage = await tx.subPage.findUnique({
        where: { id: subpageId },
        select: {
          labels: {
            where: { orderInSubpage: { not: null } },
            orderBy: { orderInSubpage: 'desc' },
            take: 1,
            select: { orderInSubpage: true },
          },
        },
      });
      if (!subpage) {
        throw subpageDoesNotExistError;
      }
      const highestOrder = subpage.labels.length ? subpage.labels[0]?.orderInSubpage : 0;
      if (!highestOrder && highestOrder !== 0) {
        throw serverInternalError;
      }
      const newLabel = await tx.label.create({
        data: {
          name: data.name,
          subPageId: subpageId,
          orderInSubpage: highestOrder,
        },
        select: {
          id: true,
          name: true,
          orderInSubpage: true,
          createdAt: true,
        },
      });
      subpageEditCreate({ userId, subpageId }, new Date(), tx);
      logger.debug({ label: { create: 'successfull done' } });
      return Result.ok(newLabel);
    });
  } catch (e) {
    logger.debug({ label: { create: 'error' } });
    return Result.err(e as Error);
  }
};
export default create;
