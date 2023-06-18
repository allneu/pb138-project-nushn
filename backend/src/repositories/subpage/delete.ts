import { Result } from '@badrap/result';
import {
  Deleted, UserIdSubpageIdType, subpageDoesNotExistError, subpageWasDeletedError,
  userHasNotPermissionError, userWasDeletedError,
} from '../../models';
import client from '../client';
import { PrismaTransactionHandle } from '../common/types';

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
  await tx.subPage.update({
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
  });
};

const subpageEditCreate = async (
  { userId, subpageId }: UserIdSubpageIdType,
  deletedAt: Date,
  tx: PrismaTransactionHandle,
) => {
  await tx.subPageEdit.create({
    data: {
      subpageId,
      editorId: userId,
      editedAt: deletedAt,
    },
  });
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
): Promise<Result<Deleted>> => {
  try {
    return Result.ok(
      await client.$transaction(async (tx: PrismaTransactionHandle) => {
        await canDelete(params, tx);
        const deletedAt = new Date();
        await (
          subpageLabelsRoleDelete(params, deletedAt, tx),
          subpageEditCreate(params, deletedAt, tx),
          tasksDelete(params, deletedAt, tx)
        );
        return {};
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default deleteSubpage;
