import { Result } from '@badrap/result';
import client from '../client';
import {
  TaskDeleteResult, TaskIdSubpageIdType, serverInternalError, taskDoesNotExistError,
  taskWasDeletedError, wrongSubpageIdError,
} from '../../models';
import logger from '../../log/log';

const deleteTask = async (
  { taskId, subpageId }: TaskIdSubpageIdType,
): Promise<Result<TaskDeleteResult>> => {
  logger.debug({ task: { deleteTask: 'start' } });
  try {
    return await client.$transaction(async (tx) => {
      const deletedAt = new Date();

      const taskData = await tx.task.findUnique({
        where: { id: taskId },
        select: {
          orderInLabel: true,
          orderInList: true,
          deletedAt: true,
          labelId: true,
          label: {
            select: {
              subPage: {
                select: { id: true },
              },
            },
          },
        },
      });
      if (!taskData) {
        throw taskDoesNotExistError;
      } if (taskData.deletedAt) {
        throw taskWasDeletedError;
      } if (taskData.label.subPage.id !== subpageId) {
        throw wrongSubpageIdError;
      } if (!taskData.orderInLabel && taskData.orderInLabel !== 0) {
        throw serverInternalError;
      }
      await tx.label.update({
        where: { id: taskData.labelId },
        data: {
          tasks: {
            updateMany: [{
              where: { id: taskId },
              data: { deletedAt, orderInList: null, orderInLabel: null },
            }, {
              where: { orderInLabel: { gt: taskData.orderInLabel, not: null }, deletedAt: null },
              data: { orderInLabel: { decrement: 1 } },
            }],
          },
        },
      });

      const subpage = await tx.subPage.findUniqueOrThrow({
        where: { id: subpageId },
        select: {
          labels: {
            select: { id: true },
          },
        },
      });

      await Promise.all(subpage.labels.map(async (l) => {
        if (!taskData.orderInList && taskData.orderInList !== 0) {
          throw serverInternalError;
        }
        await tx.label.update({
          where: { id: l.id },
          data: {
            tasks: {
              updateMany: {
                where: { orderInList: { gt: taskData.orderInList, not: null } },
                data: { orderInList: { decrement: 1 } },
              },
            },
          },
        });
      }));
      logger.debug({ task: { deleteTask: 'successfull done' } });
      return Result.ok({ taskId, labelId: taskData.labelId });
    });
  } catch (e) {
    logger.debug({ task: { deleteTask: 'error' } });
    return Result.err(e as Error);
  }
};
export default deleteTask;
