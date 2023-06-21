import { Result } from '@badrap/result';
import {
  PrismaTransactionHandle,
  genericError,
} from './types';

export const checkSubpage = async (
  id: string,
  tx: PrismaTransactionHandle,
) => {
  try {
    const subPage = await tx.subPage.findFirstOrThrow({
      where: { id },
    });
    if (subPage === null) {
      return Result.err(new Error('The specified subpage does not exist!'));
    } if (subPage.deletedAt !== null) {
      return Result.err(new Error('The specified subpage has already been deleted!'));
    }
    return Result.ok({});
  } catch {
    return genericError;
  }
};

export const checkLabel = async (
  id: string,
  tx: PrismaTransactionHandle,
) => {
  try {
    const label = await tx.label.findFirstOrThrow({
      where: { id },
    });
    if (label === null) {
      return Result.err(new Error('The specified label does not exist!'));
    } if (label.deletedAt !== null) {
      return Result.err(new Error('The specified label has already been deleted!'));
    }
    return Result.ok({});
  } catch {
    return genericError;
  }
};

export const checkTask = async (
  id: string,
  tx: PrismaTransactionHandle,
) => {
  try {
    const task = await tx.task.findFirst({
      where: { id },
    });
    if (task === null) {
      return Result.err(new Error('The specified task does not exist!'));
    } if (task.deletedAt !== null) {
      return Result.err(new Error('The specified task has already been deleted!'));
    }
    return Result.ok({});
  } catch {
    return genericError;
  }
};

export const checkUser = async (
  id: string,
  tx: PrismaTransactionHandle,
) => {
  try {
    const user = await tx.user.findFirst({
      where: { id },
    });
    if (user === null) {
      return Result.err(new Error('The specified user does not exist!'));
    } if (user.deletedAt !== null) {
      return Result.err(new Error('The specified user has already been deleted!'));
    }
    return Result.ok({});
  } catch {
    return genericError;
  }
};
