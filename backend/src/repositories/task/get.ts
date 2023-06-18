import { Result } from '@badrap/result';
import { checkSubpage } from '../common/common';
import client from '../client';
import {
  SubpageIdType, Task, TaskGetMultipleResult, TaskIdSubpageIdType,
} from '../../models';

export const getOne = async (data: TaskIdSubpageIdType): Promise<Result<Task>> => {
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
      const creator: { id: string, username: string } = await tx.user.findUniqueOrThrow({
        where: { id: task.creatorId },
        select: { id: true, username: true },
      });
      if (task.orderInLabel === null || task.orderInList === null) {
        throw new Error('Order error.');
      }

      const result: Task = {
        id: task.id,
        taskName: task.taskName,
        dueDate: task.dueDate,
        content: task.content,
        creator,
        labelId: task.labelId,
        orderInLabel: task.orderInLabel,
        orderInList: task.orderInList,
        createdAt: task.createdAt,
      };
      return Result.ok(result);
    });
  } catch {
    return Result.err(new Error('There was a problem getting labels'));
  }
};

// TODO add real creators to taskresult

export const getMultiple = async (data: SubpageIdType):
Promise<Result<TaskGetMultipleResult>> => {
  try {
    return await client.$transaction(async (tx) => {
      const subPageExists = await checkSubpage(data.subpageId, tx);
      if (subPageExists.isErr) {
        return Result.err(subPageExists.error);
      }

      const tasks = (await tx.label.findMany({
        where: { subPageId: data.subpageId, deletedAt: null },
        select: {
          tasks: {
            where: { deletedAt: null },
            select: {
              id: true,
              taskName: true,
              dueDate: true,
              content: true,
              labelId: true,
              orderInList: true,
              orderInLabel: true,
              createdAt: true,
              creator: {
                select: {
                  id: true,
                  username: true,
                },
              },
            },
          },
        },
      })).map((label) => label.tasks).flat();
      return Result.ok({ tasks });
    });
  } catch {
    return Result.err(new Error('There was a problem getting labels'));
  }
};
