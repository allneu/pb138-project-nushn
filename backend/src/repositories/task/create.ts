import { Result } from '@badrap/result';
import { Task } from '@prisma/client';
import { TaskCreateData, TaskCreateResultBody } from '../../controllers/task/create';
import { checkLabel } from '../common/common';
import client from '../client';

const create = async (
  data: TaskCreateData,
) => {
  try {
    return await client.$transaction(async (tx) => {
      const labelExists = await checkLabel(data.labelId, tx);
      if (labelExists.isErr) {
        return Result.err(labelExists.error);
      }
      const highestLabelOrder = await tx.task.findFirst({
        where: { orderInLabel: { not: null }, labelId: data.labelId },
        orderBy: {
          orderInLabel: 'desc',
        },
        take: 1,
      });
      const highestListOrder = await tx.task.findFirst({
        where: { orderInList: { not: null } },
        orderBy: {
          orderInList: 'desc',
        },
        take: 1,
      });
      const newTask: Task = await tx.task.create({
        data: {
          taskName: data.taskName,
          dueDate: data.dueDate,
          content: data.content ? data.content : '',
          creatorId: data.creatorId,
          labelId: data.labelId,
          orderInLabel: highestLabelOrder ? highestLabelOrder.orderInLabel! + 1 : 0,
          orderInList: highestListOrder ? highestListOrder.orderInList! + 1 : 0,
          image: data.image ? data.image : null,
        },
      });
      const creator: { id: string, userName: string } = await tx.user.findUniqueOrThrow({
        where: { id: newTask.creatorId },
        select: { id: true, userName: true },
      });
      const result: TaskCreateResultBody = {
        id: newTask.id,
        taskName: newTask.taskName,
        dueDate: newTask.dueDate,
        content: newTask.content,
        creator,
        labelId: newTask.labelId,
        orderInLabel: newTask.orderInLabel!,
        orderInList: newTask.orderInList!,
        createdAt: newTask.createdAt,
      };

      return Result.ok(result);
    });
  } catch (e) {
    console.log(e);
    return Result.err(new Error('There was a problem in label creation'));
  }
};
export default create;
