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
      return Result.err(new Error('The specified employee does not exist!'));
    } if (subPage.deletedAt !== null) {
      return Result.err(new Error('The specified employee has already been deleted!'));
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
      return Result.err(new Error('The specified employee does not exist!'));
    } if (label.deletedAt !== null) {
      return Result.err(new Error('The specified employee has already been deleted!'));
    }
    return Result.ok({});
  } catch {
    return genericError;
  }
};
