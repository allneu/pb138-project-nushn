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
    const subPage = await tx.subPage.findFirst({
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
    const label = await tx.label.findFirst({
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

export const moveIndexes = async (
  labelId: string,
  oldIndex: number,
  newIndex: number,
  tx: PrismaTransactionHandle,
) => {
  try {
    if (oldIndex === newIndex) {
      return Result.ok({});
    }
    // set order to null to create space for others to shift

    await tx.label.update({
      where: { id: labelId },
      data: { orderInSubpage: null },
    });

    // oldIndex is smaller,
    // then shift all items that are GT oldIndex and LTE newIndex to the left

    if (oldIndex < newIndex) {
      await tx.label.updateMany({
        where: {
          orderInSubpage: {
            not: null,
            gt: oldIndex,
            lte: newIndex,
          },
        },
        data: { orderInSubpage: { increment: -1 } },
      });
    }
    // oldIndex is larger,
    // then shift all items that are GTE then newIndex and LT oldIndex

    if (oldIndex > newIndex) {
      const itemsToShift = await tx.label.findMany({
        where: {
          orderInSubpage: {
            not: null,
            lt: oldIndex,
            gte: newIndex,
          },
        },
      });
      // this is just weird, but because we want to
      // increment the orderinsubpage value +1
      // we violate the unique constraint of orderInSubpage
      // cause of 2+1 == 3 != 4 != 5 6 7 ...
      itemsToShift.reverse();
      await Promise.all(
        itemsToShift.map(async (item: any) => {
          await tx.label.update({
            where: { id: item.id },
            data: { orderInSubpage: item!.orderInSubpage! + 1 },
          });
        }),
      );
    }
    await tx.label.update({
      where: { id: labelId },
      data: { orderInSubpage: newIndex },
    });
    return Result.ok({});
  } catch {
    return genericError;
  }
};
