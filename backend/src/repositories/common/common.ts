import { Result } from '@badrap/result';
import {
  PrismaTransactionHandle,
  genericError,
} from './types';
import {
  subpageDoesNotExistError, subpageWasDeletedError, userDoesNotExistError, userWasDeletedError,
} from '../../models';
import logger from '../../log/log';

export const checkSubpage = async (
  id: string,
  tx: PrismaTransactionHandle,
) => {
  logger.debug({ common: { checkSubpage: 'start' } });
  const subPage = await tx.subPage.findUnique({
    where: { id },
    select: { deletedAt: true },
  });
  if (subPage === null) {
    throw subpageDoesNotExistError;
  } if (subPage.deletedAt) {
    throw subpageWasDeletedError;
  }
  logger.debug({ common: { checkSubpage: 'successfull done' } });
  return true;
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
  const user = await tx.user.findFirst({
    where: { id },
  });
  if (user === null) {
    throw userDoesNotExistError;
  } if (user.deletedAt !== null) {
    throw userWasDeletedError;
  }
  return Result.ok({});
};
