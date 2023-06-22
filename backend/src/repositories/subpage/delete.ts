import { Result } from '@badrap/result';
import {
  SubpageIdType, UserIdSubpageIdType, subpageDoesNotExistError, subpageWasDeletedError,
  userHasNotPermissionError, userWasDeletedError,
} from '../../models';
import client from '../client';
import { PrismaTransactionHandle } from '../common/types';
import subpageEditCreate from '../common/subpageUpdate';
import logger from '../../log/log';

const canDelete = async (
  { subpageId, userId }: UserIdSubpageIdType,
  tx: PrismaTransactionHandle,
) => {
  logger.debug({ subpage: { canDelete: 'start' } });
  const subpage = await tx.subPage.findUnique({
    where: {
      id: subpageId,
    },
    select: {
      deletedAt: true,
      roles: {
        where: {
          userId,
          roleType: 'OWNER',
        },
        select: {
          user: { select: { deletedAt: true } },
        },
      },
    },
  });
  if (subpage === null) {
    throw subpageDoesNotExistError;
  } if (subpage.deletedAt !== null) {
    throw subpageWasDeletedError;
  } if (subpage.roles.length === 0) {
    throw userHasNotPermissionError;
  } if (subpage.roles[0]?.user.deletedAt !== null) {
    throw userWasDeletedError;
  }
  logger.debug({ subpage: { canDelete: 'successfull done' } });
  return true;
};

const subpageLabelsRoleDelete = async (
  { subpageId }: UserIdSubpageIdType,
  deletedAt: Date,
  tx: PrismaTransactionHandle,
) => {
  logger.debug({ subpage: { subpageLabelsRoleDelete: 'start' } });
  const updated = await tx.subPage.update({
    where: {
      id: subpageId,
    },
    data: {
      deletedAt,
      labels: {
        updateMany: {
          where: { deletedAt: null },
          data: {
            deletedAt,
          },
        },
      },
      roles: {
        updateMany: {
          where: { deletedAt: null },
          data: { deletedAt },
        },
      },
    },
    select: {
      id: true,
    },
  });
  logger.debug({ subpage: { subpageLabelsRoleDelete: 'successfull done' } });
  return updated.id;
};

const tasksDelete = async (
  { subpageId }: UserIdSubpageIdType,
  deletedAt: Date,
  tx: PrismaTransactionHandle,
) => {
  logger.debug({ subpage: { tasksDelete: 'start' } });
  await tx.task.updateMany({
    where: {
      deletedAt: null,
      label: { subPageId: subpageId },
    },
    data: { deletedAt },
  });
  logger.debug({ subpage: { tasksDelete: 'successfull done' } });
  return true;
};

const deleteSubpage = async (
  params: UserIdSubpageIdType,
): Promise<Result<SubpageIdType>> => {
  logger.debug({ subpage: { creadeleteSubpagete: 'start' } });
  try {
    return await client.$transaction(async (tx: PrismaTransactionHandle) => {
      await canDelete(params, tx);
      const deletedAt = new Date();
      const id = await subpageLabelsRoleDelete(params, deletedAt, tx);
      await (
        subpageEditCreate(params, deletedAt, tx),
        tasksDelete(params, deletedAt, tx)
      );
      logger.debug({ subpage: { deleteSubpage: 'successfull done' } });
      return Result.ok({ subpageId: id });
    });
  } catch (e) {
    logger.debug({ subpage: { deleteSubpage: 'error' } });
    return Result.err(e as Error);
  }
};

export default deleteSubpage;
