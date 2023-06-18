import { Result } from '@badrap/result';
import { checkLabel } from '../common/common';
import client from '../client';
import { Task, TaskCreateType } from '../../models';

const create = async (
  data: TaskCreateType,
): Promise<Result<Task>> => {
  try {
    return await client.$transaction(async (tx) => {
      const labelExists = await checkLabel(data.labelId, tx);
      if (labelExists.isErr) {
        return Result.err(labelExists.error);
      }
      const highestLabelOrder = await tx.task.findFirstOrThrow({
        where: { orderInLabel: { not: null }, labelId: data.labelId },
        orderBy: {
          orderInLabel: 'desc',
        },
        take: 1,
      });
      const highestListOrder = await tx.task.findFirstOrThrow({
        where: { orderInList: { not: null } },
        orderBy: {
          orderInList: 'desc',
        },
        take: 1,
      });
      const newTask = await tx.task.create({
        data: {
          taskName: data.taskName,
          dueDate: data.dueDate,
          content: data.content ? data.content : '',
          creatorId: data.creatorId,
          labelId: data.labelId,
          orderInLabel: highestLabelOrder.orderInLabel ? highestLabelOrder.orderInLabel + 1 : 0,
          orderInList: highestListOrder.orderInList ? highestListOrder.orderInList + 1 : 0,
          image: data.image ? data.image : null,
        },
      });
      const creator: { id: string, username: string } = await tx.user.findUniqueOrThrow({
        where: { id: newTask.creatorId },
        select: { id: true, username: true },
      });
      if (newTask.orderInLabel === null || newTask.orderInList == null) {
        throw new Error('Order error');
      }
      const result: Task = {
        id: newTask.id,
        taskName: newTask.taskName,
        dueDate: newTask.dueDate,
        content: newTask.content,
        creator,
        labelId: newTask.labelId,
        orderInLabel: newTask.orderInLabel,
        orderInList: newTask.orderInList,
        createdAt: newTask.createdAt,
      };

      return Result.ok(result);
    });
  } catch (e) {
    return Result.err(new Error('There was a problem in label creation'));
  }
};
export default create;
