import { Result } from '@badrap/result';
import { checkLabel } from '../common/common';
import client from '../client';
import { Task, TaskCreateType } from '../../models';
import { getHighestLabelOrder, getHighestListOrder } from '../common/taks';

const create = async (
  data: TaskCreateType,
): Promise<Result<Task>> => {
  try {
    return await client.$transaction(async (tx) => {
      const labelExists = await checkLabel(data.labelId, tx);
      if (labelExists.isErr) {
        return Result.err(labelExists.error);
      }
      const highestLabelOrder = await getHighestLabelOrder(data, tx);
      const highestListOrder = await getHighestListOrder(data, tx);
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
    return Result.err(new Error('There was a problem in label creation'));
  }
};
export default create;
