import logger from '../../log/log';
import { SubpageIdType } from '../../models';
import { PrismaTransactionHandle } from './types';

const taskSelect = {
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
};

const labelTaskSelect = {
  tasks: {
    where: { deletedAt: null },
    select: taskSelect,
  },
};

const labelsWithTaskSelect = {
  labels: {
    where: { deletedAt: null },
    select: labelTaskSelect,
  },
};

export const getSubpageTasks = async (
  tx: PrismaTransactionHandle,
  { subpageId }: SubpageIdType,
) => {
  logger.debug({ common: { getSubpageTasks: 'start' } });
  const tasks = (await tx.label.findMany({
    where: { subPageId: subpageId, deletedAt: null },
    select: labelTaskSelect,
  })).flatMap((label) => label.tasks);
  logger.debug({ common: { getSubpageTasks: 'successfull done' } });
  return tasks;
};

export const getSubpageTasksByLabelId = async (
  tx: PrismaTransactionHandle,
  { labelId }: { labelId: string },
) => {
  const tasks = (await tx.label.findFirstOrThrow({
    where: { id: labelId, deletedAt: null },
    select: {
      subPage: {
        select: labelsWithTaskSelect,
      },
    },
  })).subPage.labels.flatMap((label) => label.tasks);
  return tasks;
};

export const getHighestLabelOrder = async (
  labelId: string,
  tx: PrismaTransactionHandle,
) => {
  logger.debug({ common: { getHighestLabelOrder: 'start' } });
  const res = await tx.task.findFirst({
    where: { orderInLabel: { not: null }, labelId },
    orderBy: {
      orderInLabel: 'desc',
    },
    select: { orderInLabel: true },
  });
  logger.debug({ common: { getHighestLabelOrder: 'successfull done' } });
  return res ? res.orderInLabel : 0;
};

export const getHighestListOrder = async (
  labelId: string,
  tx: PrismaTransactionHandle,
) => {
  logger.debug({ common: { getHighestListOrder: 'start' } });
  const result = await getSubpageTasksByLabelId(tx, { labelId });
  if (result.length === 0) {
    return 0;
  }
  const res = (result)
    .reduce((resTask, task) => {
      if (!resTask.orderInList) {
        return task;
      }
      if (!task.orderInList) {
        return resTask;
      }
      return resTask.orderInList > task.orderInList ? resTask : task;
    });
  logger.debug({ common: { getHighestListOrder: 'successfull done' } });
  return res.orderInList;
};
