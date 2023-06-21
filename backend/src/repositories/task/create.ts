import { Result } from '@badrap/result';
import client from '../client';
import {
  SubpageIdType, Task, TaskCreateType, wrongSubpageIdError,
} from '../../models';
import { getHighestLabelOrder, getHighestListOrder } from '../common/task';
import logger from '../../log/log';

const create = async (
  { labelId, image, ...data }: TaskCreateType,
  { subpageId } : SubpageIdType,
): Promise<Result<Task>> => {
  logger.debug({ task: { create: 'start' } });
  try {
    return await client.$transaction(async (tx) => {
      const labelIdToUse = labelId
      || (await tx.label.findFirstOrThrow({ where: { subPageId: subpageId, name: 'unlabeled' } })).id;

      const highestLabelOrder = await getHighestLabelOrder(labelIdToUse, tx);
      const highestListOrder = await getHighestListOrder(labelIdToUse, tx);

      const img = image ? { image } : {};

      const { label, ...newTask } = await tx.task.create({
        data: {
          ...data,
          ...img,
          labelId: labelIdToUse,
          orderInLabel: highestLabelOrder || highestLabelOrder === 0 ? highestLabelOrder + 1 : 0,
          orderInList: highestListOrder || highestListOrder === 0 ? highestListOrder + 1 : 0,
        },
        include: {
          label: {
            select: {
              subPageId: true,
            },
          },
          creator: true,
        },
      });
      if (label.subPageId !== subpageId) {
        throw wrongSubpageIdError;
      }
      logger.debug({ task: { create: 'successfull done' } });
      return Result.ok(newTask);
    });
  } catch (e) {
    logger.debug({ task: { create: 'error' } });
    return Result.err(e as Error);
  }
};
export default create;
