import { Result } from '@badrap/result';
import { checkSubpage } from '../common/common';
import client from '../client';
import {
  SubpageIdType, Task, TaskGetMultipleResult, TaskIdSubpageIdType, serverInternalError,
  subpageWasDeletedError,
  taskDoesNotExistError, taskWasDeletedError, wrongSubpageIdError,
} from '../../models';
import { getSubpageTasks } from '../common/task';
import logger from '../../log/log';

export const getOne = async ({ subpageId, taskId }: TaskIdSubpageIdType): Promise<Result<Task>> => {
  try {
    return await client.$transaction(async (tx) => {
      logger.debug({ task: { getOne: 'start' } });
      const task = await tx.task.findUnique({
        where: { id: taskId },
        select: {
          id: true,
          dueDate: true,
          taskName: true,
          content: true,
          creator: { select: { id: true, username: true } },
          labelId: true,
          orderInLabel: true,
          orderInList: true,
          createdAt: true,
          deletedAt: true,
          done: true,
          label: { select: { subPage: { select: { id: true, deletedAt: true } } } },
        },
      });
      if (!task) {
        throw taskDoesNotExistError;
      }
      const { deletedAt, label, ...taskResult } = task;
      if (deletedAt) {
        throw taskWasDeletedError;
      } if (label.subPage.id !== subpageId) {
        throw wrongSubpageIdError;
      } if (label.subPage.deletedAt) {
        throw subpageWasDeletedError;
      }
      if (taskResult.orderInLabel === null || taskResult.orderInList === null) {
        throw serverInternalError;
      }
      logger.debug({ task: { getOne: 'successfull done' } });
      return Result.ok(taskResult);
    });
  } catch (e) {
    logger.debug({ task: { getOne: 'error' } });
    return Result.err(e as Error);
  }
};

export const getMultiple = async (data: SubpageIdType):
Promise<Result<TaskGetMultipleResult>> => {
  logger.debug({ task: { getMultiple: 'start' } });
  try {
    return await client.$transaction(async (tx) => {
      await checkSubpage(data.subpageId, tx);
      const tasks = await getSubpageTasks(tx, data);
      logger.debug({ task: { getMultiple: 'successfull done' } });
      tasks.sort((a, b) => (
        a.orderInList ? a.orderInList : 0) - (b.orderInList ? b.orderInList : 0));
      return Result.ok({ tasks });
    });
  } catch (e) {
    logger.debug({ task: { getMultiple: 'error' } });
    return Result.err(e as Error);
  }
};
