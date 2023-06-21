import { Result } from '@badrap/result';
import {
  TaskIdSubpageIdType, TaskUpdateResult, TaskUpdateType,
  oldDataError,
  serverInternalError,
  subpageDoesNotExistError,
  taskDoesNotExistError,
  taskWasDeletedError,
} from '../../models';
import client from '../client';
import { PrismaTransactionHandle } from '../common/types';
import { getHighestLabelOrder } from '../common/task';
import logger from '../../log/log';

const controlLastData = async (
  data: TaskUpdateType,
  { taskId }: TaskIdSubpageIdType,
  tx: PrismaTransactionHandle,
) => {
  logger.debug({ task: { controlLastData: 'start' } });
  const task = await tx.task.findUnique({
    where: { id: taskId },
    select: {
      taskName: true,
      dueDate: true,
      content: true,
      labelId: true,
      orderInList: true,
      orderInLabel: true,
      deletedAt: true,
    },
  });
  if (!task) {
    logger.debug({ task: { controlLastData: 'task does not exist error' } });
    throw taskDoesNotExistError;
  } if (task.deletedAt !== null) {
    logger.debug({ task: { controlLastData: 'task was deleted error' } });
    throw taskWasDeletedError;
  } if (
    (data.newTaskName !== undefined && data.oldTaskName !== task.taskName)
    || (data.newDueDate !== undefined && data.oldDueDate !== task.dueDate)
    || (data.newContent !== undefined && data.oldContent !== task.content)
    || (data.newLabelId !== undefined && data.oldLabelId !== task.labelId)
    || (data.newOrderInLabel !== undefined && data.oldOrderInLabel !== task.orderInLabel)
    || (data.newOrderInList !== undefined && data.oldOrderInList !== task.orderInList)
  ) {
    logger.debug({ task: { controlLastData: 'oldDataError' } });
    throw oldDataError;
  }
  logger.debug({ task: { controlLastData: 'successfull done' } });
  return task;
};

const updateOrderInLabel = async (
  newOrderInLabel: number,
  { taskId }: TaskIdSubpageIdType,
  tx: PrismaTransactionHandle,
) => {
  logger.debug({ task: { updateOrderInLabel: 'start' } });
  const { labelId, orderInLabel } = await tx.task.findUniqueOrThrow({
    where: { id: taskId },
    select: { labelId: true, orderInLabel: true },
  });

  if (!orderInLabel && orderInLabel !== 0) {
    throw serverInternalError;
  }

  await tx.label.update({
    where: { id: labelId },
    data: {
      tasks: {
        updateMany: [{
          where: { orderInLabel: { lte: newOrderInLabel, gt: orderInLabel } },
          data: { orderInLabel: { decrement: 1 } },
        }, {
          where: { orderInLabel: { gte: newOrderInLabel, lt: orderInLabel } },
          data: { orderInLabel: { increment: 1 } },
        }, {
          where: { id: taskId },
          data: { orderInLabel: newOrderInLabel },
        }],
      },
    },
  });
  logger.debug({ task: { updateOrderInLabel: 'successfull done' } });
  return newOrderInLabel;
};

const updateOrderInList = async (
  { newOrderInList, oldOrderInList }: TaskUpdateType,
  { subpageId, taskId }: TaskIdSubpageIdType,
  tx: PrismaTransactionHandle,
) => {
  logger.debug({ task: { updateOrderInList: 'start' } });
  if ((!newOrderInList && newOrderInList !== 0) || (!oldOrderInList && oldOrderInList !== 0)) {
    logger.debug({ task: { updateOrderInList: 'error 1' } });
    throw serverInternalError;
  }
  const subpage = await tx.subPage.findUnique({
    where: { id: subpageId },
    select: {
      labels: {
        select: { id: true },
      },
    },
  });

  if (!subpage) {
    logger.debug({ task: { updateOrderInList: 'error 2' } });
    throw subpageDoesNotExistError;
  }
  await Promise.all(subpage.labels.map(async (l) => {
    await tx.label.update({
      where: { id: l.id },
      data: {
        tasks: {
          updateMany: [{
            where: { orderInList: { lte: newOrderInList, gt: oldOrderInList } },
            data: { orderInList: { decrement: 1 } },
          }, {
            where: { orderInList: { gte: newOrderInList, lt: oldOrderInList } },
            data: { orderInList: { increment: 1 } },
          }],
        },
      },
    });
  }));
  await tx.task.update({
    where: { id: taskId },
    data: { orderInList: newOrderInList },
  });
  logger.debug({ task: { updateOrderInList: 'successfull done' } });
  return newOrderInList;
};

const updateTask = async (
  data: TaskUpdateType,
  { taskId }: TaskIdSubpageIdType,
  tx: PrismaTransactionHandle,
) => {
  logger.debug({ task: { updateTask: 'start' } });
  const taskName = data.newTaskName ? { taskName: data.newTaskName } : {};
  const dueDate = data.newDueDate ? { dueDate: data.newDueDate } : {};
  const content = data.newContent ? { content: data.newContent } : {};
  const task = await tx.task.update({
    where: { id: taskId },
    data: {
      ...taskName, ...dueDate, ...content,
    },
    select: {
      id: true,
      taskName: !!data.newTaskName,
      dueDate: !!data.newDueDate,
      content: !!data.newContent,
    },
  });
  logger.debug({ task: { updateTask: 'successfull done' } });
  return task;
};

const updateLabel = async (
  { oldLabelId, newLabelId }: TaskUpdateType,
  { taskId }: TaskIdSubpageIdType,
  orderInLabel: number | null,
  tx: PrismaTransactionHandle,
) => {
  logger.debug({ task: { updateLabel: 'start' } });
  if (oldLabelId === newLabelId) {
    logger.debug({ task: { updateLabel: 'exit - same labels' } });
    return {};
  }
  if (!oldLabelId || orderInLabel === null || !newLabelId) {
    throw serverInternalError;
  }
  const highestLabelOrder = await getHighestLabelOrder(newLabelId, tx);
  const { tasks } = (await tx.label.update({
    where: { id: oldLabelId },
    data: {
      tasks: {
        updateMany: [{
          where: { orderInLabel: { gt: orderInLabel } },
          data: { orderInLabel: { decrement: 1 } },
        }, {
          where: { id: taskId },
          data: {
            orderInLabel: highestLabelOrder || highestLabelOrder === 0 ? highestLabelOrder + 1 : 0,
            labelId: newLabelId,
          },
        }],
      },
    },
    select: {
      tasks: {
        where: { id: taskId },
        select: { orderInLabel: true, labelId: true },
      },
    },
  }));
  logger.debug({ task: { updateLabel: 'successfull done' } });
  return tasks[0];
};

const update = async (
  data: TaskUpdateType,
  params: TaskIdSubpageIdType,
): Promise<Result<TaskUpdateResult>> => {
  logger.debug({ task: { update: 'start' } });
  try {
    return await client.$transaction(async (tx: PrismaTransactionHandle) => {
      const oldTask = await controlLastData(data, params, tx);
      const task = await updateTask(data, params, tx);
      const taskLabel = data.newLabelId
        ? await updateLabel(data, params, oldTask.orderInLabel, tx) : {};
      const orderInLabel = data.newOrderInLabel !== undefined
        ? { orderInLabel: await updateOrderInLabel(data.newOrderInLabel, params, tx) } : {};
      const orderInList = data.newOrderInList !== undefined
        ? { orderInList: await updateOrderInList(data, params, tx) } : {};
      logger.debug({ task: { update: 'successfull done' } });
      return Result.ok({
        ...task, ...orderInLabel, ...taskLabel, ...orderInList,
      });
    });
  } catch (e) {
    logger.debug({ task: { update: 'error' } });
    return Result.err(e as Error);
  }
};
export default update;
