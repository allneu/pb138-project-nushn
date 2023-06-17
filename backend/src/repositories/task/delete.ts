import { Result } from '@badrap/result';
import { checkLabel, checkSubpage, checkTask } from '../common/common';
import client from '../client';
import { TaskDeleteData } from '../../controllers/task/delete';

// can surely be written better, check if there is time

const deleteTask = async (
  data: TaskDeleteData,
): Promise<Result<object>> => {
  try {
    return await client.$transaction(async (tx) => {
      const subPageExists = await checkSubpage(data.subpageId, tx);
      if (subPageExists.isErr) {
        return Result.err(subPageExists.error);
      }
      const labelExists = await checkLabel(data.labelId, tx);
      if (labelExists.isErr) {
        return Result.err(labelExists.error);
      }
      const taskExists = await checkTask(data.subpageId, tx);
      if (taskExists.isErr) {
        return Result.err(taskExists.error);
      }
      const deletedAt = new Date();
      // get curr order
      const currOrders = await tx.task.findFirst({
        where: { id: data.taskId },
        select: { orderInList: true, orderInLabel: true },
      });
      const currListOrder = currOrders!.orderInList!;
      const currLabelOrder = currOrders!.orderInLabel!;
      // delete the label and set order to null
      const task = await tx.task.update({
        where: { id: data.taskId },
        data: { deletedAt, orderInList: null, orderInLabel: null },
      });
      await tx.task.updateMany({
        where: {
          orderInList: {
            not: null,
            gt: currListOrder!,
          },
        },
        data: { orderInList: { increment: -1 } },
      });
      await tx.task.updateMany({
        where: {
          labelId: task.labelId,
          orderInLabel: {
            not: null,
            gt: currLabelOrder!,
          },
        },
        data: { orderInLabel: { increment: -1 } },
      });
      console.log('asdasd');
      return Result.ok({});
    });
  } catch {
    return Result.err(new Error('There was a problem deleting task'));
  }
};
export default deleteTask;
