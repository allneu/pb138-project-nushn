import { Result } from '@badrap/result';
import { LabelIdSubpageIdType } from '../../models/urlParamsSchema';
import client from '../client';
import { LabelDeleteResult } from '../../models/labelModels';
import {
  labelDoesNotExistError, labelWasDeletedError, serverInternalError, wrongSubpageIdError,
} from '../../models';
import logger from '../../log/log';

const deleteLabel = async (
  { labelId, subpageId }: LabelIdSubpageIdType,
): Promise<Result<LabelDeleteResult>> => {
  logger.debug({ label: { delete: 'start' } });
  try {
    return await client.$transaction(async (tx) => {
      const deletedAt = new Date();

      const labelData = await tx.label.findUnique({
        where: { id: labelId },
        select: { orderInSubpage: true, deletedAt: true, subPageId: true },
      });
      if (!labelData) {
        throw labelDoesNotExistError;
      } if (labelData.deletedAt) {
        throw labelWasDeletedError;
      } if (subpageId !== labelData.subPageId) {
        throw wrongSubpageIdError;
      } if (!labelData.orderInSubpage && labelData.orderInSubpage !== 0) {
        throw serverInternalError;
      }

      await (
        tx.subPage.update({
          where: { id: subpageId },
          data: {
            labels: {
              updateMany: {
                where: { orderInSubpage: { gt: labelData.orderInSubpage } },
                data: { orderInSubpage: { decrement: 1 } },
              },
            },
          },
        }),
        tx.label.update({
          where: { id: labelId },
          data: {
            deletedAt,
            orderInSubpage: null,
            tasks: {
              updateMany: {
                where: { deletedAt: null },
                data: { deletedAt },
              },
            },
          },
          select: {
            id: true,
          },
        })
      );
      logger.debug({ label: { delete: 'successfull done' } });
      return Result.ok({ labelId });
    });
  } catch (e) {
    logger.debug({ label: { delete: 'error' } });
    return Result.err(e as Error);
  }
};

export default deleteLabel;
