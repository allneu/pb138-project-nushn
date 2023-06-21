import { Result } from '@badrap/result';
import {
  SubpageIdType, UserIdSubpageIdType, subpageDoesNotExistError, subpageWasDeletedError,
  userHasNotPermissionError, userWasDeletedError,
} from '../../models';
import client from '../client';
import { PrismaTransactionHandle } from '../common/types';
import subpageEditCreate from '../common/subpageUpdate';

const canDelete = async (
  { subpageId, userId }: UserIdSubpageIdType,
  tx: PrismaTransactionHandle,
) => {
  const subpage = await tx.subPage.findUnique({
    where: {
      id: subpageId,
    },
    select: {
      deletedAt: true,
      roles: {
        where: {
          userId,
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
  return true;
};

const subpageLabelsRoleDelete = async (
  { subpageId }: UserIdSubpageIdType,
  deletedAt: Date,
  tx: PrismaTransactionHandle,
) => {
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
  return updated.id;
};

const tasksDelete = async (
  { subpageId }: UserIdSubpageIdType,
  deletedAt: Date,
  tx: PrismaTransactionHandle,
) => {
  await tx.task.updateMany({
    where: {
      deletedAt: null,
      label: { subPageId: subpageId },
    },
    data: { deletedAt },
  });
};

const deleteSubpage = async (
  params: UserIdSubpageIdType,
): Promise<Result<SubpageIdType>> => {
  try {
    return Result.ok(
      await client.$transaction(async (tx: PrismaTransactionHandle) => {
        await canDelete(params, tx);
        const deletedAt = new Date();
        const id = await subpageLabelsRoleDelete(params, deletedAt, tx);
        await (
          subpageEditCreate(params, deletedAt, tx),
          tasksDelete(params, deletedAt, tx)
        );
        return { subpageId: id };
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default deleteSubpage;
