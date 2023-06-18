import { Result } from '@badrap/result';
import { checkLabel } from '../common/common';
import client from '../client';
import { Task, TaskCreateType } from '../../models';
import { getHighestLabelOrder, getHighestListOrder } from '../common/task';

const create = async (
  data: TaskCreateType,
): Promise<Result<Task>> => {
  try {
    return await client.$transaction(async (tx) => {
      const labelExists = await checkLabel(data.labelId, tx);
      if (labelExists.isErr) {
        throw labelExists.error;
      }
      const highestLabelOrder = await getHighestLabelOrder(data.labelId, tx);
      const highestListOrder = await getHighestListOrder(data.labelId, tx);
      const newTask = await tx.task.create({
        data: {
          ...data,
          orderInLabel: highestLabelOrder ? highestLabelOrder + 1 : 0,
          orderInList: highestListOrder ? highestListOrder + 1 : 0,
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
