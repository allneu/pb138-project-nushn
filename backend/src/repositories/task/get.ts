import { Result } from '@badrap/result';
import { checkSubpage } from '../common/common';
import client from '../client';
import {
  TaskIdSubpageIdType,
  SubpageIdType,
} from '../models/urlParamsSchema';
import {
  TaskReturn,
  TaskGetMultipleResult,
} from '../models/taskModels';

export const getOne = async (data: TaskIdSubpageIdType): Promise<Result<TaskReturn>> => {
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
              creator: {
                select: {
                  id: true,
                  userName: true,
                },
              },
            },
          },
<<<<<<< HEAD
        },
      })).map((label) => label.tasks).flat();
      return Result.ok({ tasks });
=======
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
          creator: { id: task.creatorId, username: '' }, // Add a dummy userName or fetch it from the user table
          labelId: task.labelId,
          orderInLabel: task.orderInLabel!,
          orderInList: task.orderInList!,
        })),
      };
      return Result.ok(result);
>>>>>>> bf0968d480e0cbe9df6c9fd96eff44648cb02e80
    });
  } catch {
    return Result.err(new Error('There was a problem getting labels'));
  }
};
