import { Result } from '@badrap/result';
import { checkLabel } from '../common/common';
import client from '../client';
import { SubpageIdType, Task, TaskCreateType } from '../../models';
import { getHighestLabelOrder, getHighestListOrder } from '../common/task';
import getLogger from '../../log/log';

const create = async (
  { labelId, ...data }: TaskCreateType,
  { subpageId } : SubpageIdType,
): Promise<Result<Task>> => {
  try {
    return await client.$transaction(async (tx) => {
      const labelIdToUse = labelId
      || (await tx.label.findFirstOrThrow({ where: { subPageId: subpageId, name: 'unlabeled' } })).id;
      if (labelId) {
        const labelExists = await checkLabel(labelId, tx);
        if (labelExists.isErr) {
          throw labelExists.error;
        }
      }
      const highestLabelOrder = await getHighestLabelOrder(labelIdToUse, tx);
      const highestListOrder = await getHighestListOrder(labelIdToUse, tx);

      getLogger(false).info({ hLabelO: highestLabelOrder, hListO: highestListOrder });

      const newTask = await tx.task.create({
        data: {
          ...data,
          labelId: labelIdToUse,
          orderInLabel: highestLabelOrder || highestLabelOrder === 0 ? highestLabelOrder + 1 : 0,
          orderInList: highestListOrder || highestListOrder === 0 ? highestListOrder + 1 : 0,
        },
        include: {
          creator: true,
        },
      });
      return Result.ok(newTask);
    });
  } catch (e) {
    return Result.err(e as Error);
  }
};
export default create;
