import { Result } from '@badrap/result';
import {
  PrismaTransactionHandle,
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
