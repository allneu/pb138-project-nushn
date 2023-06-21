import { Result } from '@badrap/result';
import { LabelUpdateResult, LabelUpdateType } from '../../models/labelModels';
import client from '../client';
import { LabelIdSubpageIdType } from '../../models/urlParamsSchema';
import {
  canNotCreateUnlabeled,
  canNotRenameUnlabeled,
  labelDoesNotExistError, labelWasDeletedError, oldDataError, wrongSubpageIdError,
} from '../../models';
import { PrismaTransactionHandle } from '../common/types';
import logger from '../../log/log';

const controlLastData = async (
  data: LabelUpdateType,
  { labelId, subpageId }: LabelIdSubpageIdType,
  tx: PrismaTransactionHandle,
) => {
  logger.info({ label: { controlLastData: 'start' } });
  const label = await tx.label.findUnique({
    where: { id: labelId },
    select: {
      name: true,
      orderInSubpage: true,
      deletedAt: true,
      subPageId: true,
    },
  });
  if (!label) {
    throw labelDoesNotExistError;
  } if (label.subPageId !== subpageId) {
    throw wrongSubpageIdError;
  } if (label.deletedAt !== null) {
    throw labelWasDeletedError;
  } if (
    (data.newName && data.oldName !== label.name)
    || (data.newOrderInSubpage && data.oldOrderInSubpage !== label.orderInSubpage)
  ) {
    throw oldDataError;
  }
  logger.info({ label: { controlLastData: 'succefull done' } });
  return true;
};

const update = async (
  data: LabelUpdateType,
  params: LabelIdSubpageIdType,
): Promise<Result<LabelUpdateResult>> => {
  logger.info({ label: { update: 'start' } });
  try {
    if (data.newName === 'unlabeled') {
      throw canNotCreateUnlabeled;
    } if (data.oldName === 'unlabeled') {
      throw canNotRenameUnlabeled;
    }
    return await client.$transaction(async (tx) => {
      const { labelId, subpageId } = params;
      await controlLastData(data, params, tx);

      const label = data.newName ? await tx.label.update({
        where: { id: labelId },
        data: {
          name: data.newName,
        },
        select: { name: true },
      }) : {};

      if (data.newOrderInSubpage && data.oldOrderInSubpage) {
        await tx.subPage.update({
          where: { id: subpageId },
          data: {
            labels: {
              updateMany: [{
                where: {
                  deletedAt: null,
                  orderInSubpage: { lte: data.newOrderInSubpage, gt: data.oldOrderInSubpage },
                },
                data: { orderInSubpage: { decrement: 1 } },
              }, {
                where: {
                  deletedAt: null,
                  orderInSubpage: { gte: data.newOrderInSubpage, lt: data.oldOrderInSubpage },
                },
                data: { orderInSubpage: { increment: 1 } },
              }, {
                where: { id: labelId },
                data: { orderInSubpage: data.newOrderInSubpage },
              }],
            },
          },
        });
      }

      logger.info({ label: { update: 'successfull done' } });

      return Result.ok({
        id: labelId,
        ...label,
        ...(data.newOrderInSubpage ? { orderInSubpage: data.newOrderInSubpage } : {}),
      });
    });
  } catch (e) {
    logger.info({ label: { update: 'error' } });
    return Result.err(e as Error);
  }
};

export default update;
