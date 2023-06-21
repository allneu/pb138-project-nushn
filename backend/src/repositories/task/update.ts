import { Result } from '@badrap/result';
import {
  TaskIdSubpageIdType, TaskUpdateResult, TaskUpdateType,
  oldDataError,
  serverInternalError,
  taskWasDeletedError,
} from '../../models';
import client from '../client';
import { PrismaTransactionHandle } from '../common/types';
import { getHighestLabelOrder } from '../common/task';

const controlLastData = async (
  data: TaskUpdateType,
  { taskId }: TaskIdSubpageIdType,
  tx: PrismaTransactionHandle,
) => {
  const task = await tx.task.findUniqueOrThrow({
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
  if (task.deletedAt !== null) {
    throw taskWasDeletedError;
  } if (
    (data.newTaskName && data.oldTaskName !== task.taskName)
    || (data.newDueDate && data.oldDueDate !== task.dueDate)
    || (data.newContent && data.oldContent !== task.content)
    || (data.newLabelId && data.oldLabelId !== task.labelId)
    || (data.newOrderInLabel && data.oldOrderInLabel !== task.orderInLabel)
    || (data.newOrderInList && data.oldOrderInList !== task.orderInList)
  ) {
    throw oldDataError;
  }
  return task;
};

const updateOrderInLabel = async (
  { newOrderInLabel, oldOrderInLabel }: TaskUpdateType,
  labelId: string,
  tx: PrismaTransactionHandle,
) => {
  if (!newOrderInLabel || !oldOrderInLabel) {
    throw serverInternalError;
  }
  tx.label.update({
    where: { id: labelId },
    data: {
      tasks: {
        updateMany: [{
          where: { orderInLabel: { lte: newOrderInLabel, gt: oldOrderInLabel } },
          data: { orderInLabel: { decrement: 1 } },
        }, {
          where: { orderInLabel: { gte: newOrderInLabel, lt: oldOrderInLabel } },
          data: { orderInLabel: { increment: 1 } },
        }, {
          where: { orderInLabel: oldOrderInLabel },
          data: { orderInLabel: newOrderInLabel },
        }],
      },
    },
  });
  return newOrderInLabel;
};

const updateOrderInList = async (
  { newOrderInList, oldOrderInList }: TaskUpdateType,
  { subpageId, taskId }: TaskIdSubpageIdType,
  tx: PrismaTransactionHandle,
) => {
  if (!newOrderInList || !oldOrderInList) {
    throw serverInternalError;
  }
  await tx.task.update({ where: { id: taskId }, data: { orderInList: null } });
  if (newOrderInList > oldOrderInList) {
    (await tx.subPage.findUniqueOrThrow({
      where: { id: subpageId },
      select: {
        labels: {
          select: {
            tasks: {
              where: { orderInList: { lt: newOrderInList, gt: oldOrderInList } },
              select: { id: true },
              orderBy: { orderInList: 'asc' },
            },
          },
        },
      },
    })).labels.flatMap((l) => l.tasks).forEach(async (l) => {
      await tx.task.update({ where: { id: l.id }, data: { orderInList: { decrement: 1 } } });
    });
  } else {
    (await tx.subPage.findUniqueOrThrow({
      where: { id: subpageId },
      select: {
        labels: {
          select: {
            tasks: {
              where: { orderInList: { gt: newOrderInList, lt: oldOrderInList } },
              select: { id: true },
              orderBy: { orderInList: 'desc' },
            },
          },
        },
      },
    })).labels.flatMap((l) => l.tasks).forEach(async (l) => {
      await tx.task.update({ where: { id: l.id }, data: { orderInList: { increment: 1 } } });
    });
  }
  const resTask = await tx.task.update({
    where: { id: taskId },
    data: { orderInList: newOrderInList },
    select: { orderInList: true },
  });
  return resTask.orderInList;
};

const updateTask = async (
  data: TaskUpdateType,
  { taskId }: TaskIdSubpageIdType,
  tx: PrismaTransactionHandle,
) => {
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
  return task;
};

const updateLabel = async (
  { oldLabelId, newLabelId }: TaskUpdateType,
  { taskId }: TaskIdSubpageIdType,
  orderInLabel: number | null,
  tx: PrismaTransactionHandle,
) => {
  if (!oldLabelId || !orderInLabel || !newLabelId) {
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
            orderInLabel: highestLabelOrder ? highestLabelOrder + 1 : 0,
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
  return tasks[0];
};

const update = async (
  data: TaskUpdateType,
  params: TaskIdSubpageIdType,
): Promise<Result<TaskUpdateResult>> => {
  try {
    return Result.ok(
      await client.$transaction(async (tx: PrismaTransactionHandle) => {
        const oldTask = await controlLastData(data, params, tx);
        const task = await updateTask(data, params, tx);
        const taskLabel = data.newLabelId
          ? await updateLabel(data, params, oldTask.orderInLabel, tx) : {};
        const orderInLabel = data.newOrderInLabel
          ? { orderInLabel: await updateOrderInLabel(data, oldTask.labelId, tx) } : {};
        const orderInList = data.newOrderInList
          ? { orderInList: await updateOrderInList(data, params, tx) } : {};
        return {
          ...task, ...orderInLabel, ...taskLabel, ...orderInList,
        };
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};
export default update;
