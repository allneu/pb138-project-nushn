import { Result } from '@badrap/result';
import { checkSubpage } from '../common/common';
import client from '../client';
import {
  TaskGetData,
  TaskReturn,
  TaskGetMultipleBody,
  TaskGetMultipleResult,
} from '../../controllers/task/get';

export const getOne = async (data: TaskGetData): Promise<Result<TaskReturn>> => {
  try {
    return await client.$transaction(async (tx) => {
      const subPageExists = await checkSubpage(data.subpageId, tx);
      if (subPageExists.isErr) {
        return Result.err(subPageExists.error);
      }
      const task = await tx.task.findFirstOrThrow({
        where: { id: data.taskId },
      });
      if (task.deletedAt !== null) {
        return Result.err(new Error('This task is deleted'));
      }
      const creator: { id: string, userName: string } = await tx.user.findUniqueOrThrow({
        where: { id: task.creatorId },
        select: { id: true, userName: true },
      });
      const result: TaskReturn = {
        id: task.id,
        taskName: task.taskName,
        dueDate: task.dueDate,
        content: task.content,
        creator,
        labelId: task.labelId,
        orderInLabel: task.orderInLabel!,
        orderInList: task.orderInList!,
      };
      return Result.ok(result);
    });
  } catch {
    return Result.err(new Error('There was a problem getting labels'));
  }
};

// TODO add real creators to taskresult

export const getMultiple = async (data: TaskGetMultipleBody):
Promise<Result<TaskGetMultipleResult>> => {
  try {
    return await client.$transaction(async (tx) => {
      const subPageExists = await checkSubpage(data.subpageId, tx);
      if (subPageExists.isErr) {
        return Result.err(subPageExists.error);
      }

      const labels = await tx.label.findMany({
        where: { subPageId: data.subpageId, deletedAt: null },
      });

      const labelTasksPromises = labels.map(async (label) => {
        const subpageTasks = await tx.task.findMany({
          where: { labelId: label.id, deletedAt: null },
          select: {
            id: true,
            taskName: true,
            dueDate: true,
            content: true,
            creatorId: true,
            labelId: true,
            orderInLabel: true,
            orderInList: true,
          },
        });
        return subpageTasks;
      });

      // there fix the creator getting, idk how
      const tasks = await Promise.all(labelTasksPromises).then((results) => results.flat());
      const result: TaskGetMultipleResult = {
        tasks: tasks.map((task) => ({
          id: task.id,
          taskName: task.taskName,
          dueDate: task.dueDate,
          content: task.content,
          creator: { id: task.creatorId, userName: '' }, // Add a dummy userName or fetch it from the user table
          labelId: task.labelId,
          orderInLabel: task.orderInLabel!,
          orderInList: task.orderInList!,
        })),
      };
      return Result.ok(result);
    });
  } catch {
    return Result.err(new Error('There was a problem getting labels'));
  }
};
