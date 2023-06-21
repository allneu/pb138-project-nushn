import { Result } from '@badrap/result';
import { LabelUpdateResult, LabelUpdateType } from '../../models/labelModels';
import client from '../client';
import { LabelIdSubpageIdType } from '../../models/urlParamsSchema';
import {
  labelDoesNotExistError, labelWasDeletedError, oldDataError, wrongSubpageId,
} from '../../models';
import { PrismaTransactionHandle } from '../common/types';
import getLogger from '../../log/log';

const controlLastData = async (
  data: LabelUpdateType,
  { labelId, subpageId }: LabelIdSubpageIdType,
  tx: PrismaTransactionHandle,
) => {
  getLogger(true).info({ label: { controlLastData: 'start' } });
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
    throw wrongSubpageId;
  } if (label.deletedAt !== null) {
    throw labelWasDeletedError;
  } if (
    (data.newName && data.oldName !== label.name)
    || (data.newOrderInSubpage && data.oldOrderInSubpage !== label.orderInSubpage)
  ) {
    throw oldDataError;
  }
  getLogger(true).info({ label: { controlLastData: 'succefull done' } });
  return true;
};

const update = async (
  data: LabelUpdateType,
  params: LabelIdSubpageIdType,
): Promise<Result<LabelUpdateResult>> => {
  getLogger(true).info({ label: { update: 'start' } });
  try {
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

      getLogger(true).info({ label: { update: 'succefull done' } });

      return Result.ok({
        id: labelId,
        ...label,
        ...(data.newOrderInSubpage ? { orderInSubpage: data.newOrderInSubpage } : {}),
      });
    });
  } catch (e) {
    getLogger(true).info({ label: { update: 'Error' } });
    return Result.err(e as Error);
  }
};

export default update;
