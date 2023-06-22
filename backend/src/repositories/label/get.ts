import { Result } from '@badrap/result';
// TODO add LabelResultBody to import and return right value
import { LabelGetResultBody } from '../../models/labelModels';
import { SubpageIdType } from '../../models/urlParamsSchema';
import client from '../client';
import { subpageDoesNotExistError, subpageWasDeletedError } from '../../models';
import logger from '../../log/log';

const get = async ({ subpageId }: SubpageIdType):
Promise<Result<LabelGetResultBody>> => {
  logger.debug({ label: { get: 'start' } });
  try {
    return await client.$transaction(async (tx) => {
      const subpage = await tx.subPage.findUnique({
        where: { id: subpageId },
        select: {
          deletedAt: true,
          labels: {
            where: {
              deletedAt: null,
            },
            orderBy: {
              orderInSubpage: 'asc',
            },
            select: {
              id: true,
              name: true,
              orderInSubpage: true,
              createdAt: true,
              tasks: {
                where: { deletedAt: null },
                orderBy: {
                  orderInLabel: 'asc',
                },
                select: {
                  id: true,
                  taskName: true,
                  dueDate: true,
                  content: true,
                  creator: true,
                  labelId: true,
                  orderInLabel: true,
                  orderInList: true,
                  createdAt: true,
                },
              },
            },
          },
        },
      });

      if (!subpage) {
        throw subpageDoesNotExistError;
      } if (subpage.deletedAt) {
        throw subpageWasDeletedError;
      }
      logger.debug({ label: { get: 'successfull done' } });
      return Result.ok(subpage.labels);
    });
  } catch (e) {
    logger.debug({ label: { get: 'error' } });
    return Result.err(e as Error);
  }
};

export default get;
