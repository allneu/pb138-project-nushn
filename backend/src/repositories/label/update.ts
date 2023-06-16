/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Result } from '@badrap/result';
import { UpdateLabelData, LabelUpdateResultBody } from '../../controllers/label/update';
import { checkSubpage, checkLabel, moveIndexes } from '../common/common';
import client from '../client';

const update = async (
  data: UpdateLabelData,
): Promise<Result<LabelUpdateResultBody>> => {
  try {
    return await client.$transaction(async (tx) => {
      const subPageExists = await checkSubpage(data.subpageId, tx);
      if (subPageExists.isErr) {
        return Result.err(subPageExists.error);
      }
      const labelExists = await checkLabel(data.labelId, tx);
      if (labelExists.isErr) {
        return Result.err(labelExists.error);
      }
      const oldName = data.oldName ? data.oldName : null;
      const newName = oldName ? data.newName : null;
      const oldOrder = data.oldOrderInSubpage ? data.oldOrderInSubpage : null;
      const newOrder = oldOrder ? data.newOrderInSubpage : null;

      // if we have to update name and also order
      if (oldName && oldOrder) {
        const labelNow = await tx.label.findFirst({
          where: { id: data.labelId },
          select: { name: true, orderInSubpage: true },
        });
        if (labelNow!.name !== oldName) {
          return Result.err();
        }
        if (labelNow!.orderInSubpage !== oldOrder) {
          return Result.err();
        }
        const updatedNames = await tx.label.update({
          where: { id: data.labelId },
          data: { name: newName! },
          select: { id: true, name: true },
        });
        await moveIndexes(data.labelId, oldOrder, newOrder!, tx);
        const result: LabelUpdateResultBody = {
          id: updatedNames.id,
          name: updatedNames.name,
          orderInSubpage: newOrder!,
        };
        return Result.ok(result);
        // if we have to update name only
      } if (oldName && oldOrder === null) {
        const nameNow = await tx.label.findFirst({
          where: { id: data.labelId },
          select: { name: true },
        });
        if (nameNow!.name !== oldName) {
          return Result.err();
        }
        const updated = await tx.label.update({
          where: { id: data.labelId },
          data: { name: newName! },
          select: { id: true, name: true },
        });
        const result: LabelUpdateResultBody = {
          id: updated.id,
          name: updated.name,
        };
        return Result.ok(result);
      }

      // if we have to update order only

      const orderNow = await tx.label.findFirst({
        where: { id: data.labelId },
        select: { orderInSubpage: true },
      });
      if (orderNow!.orderInSubpage !== oldOrder) {
        return Result.err();
      }
      await moveIndexes(data.labelId, oldOrder!, newOrder!, tx);
      const result: LabelUpdateResultBody = {
        id: data.labelId,
        orderInSubpage: newOrder!,
      };
      return Result.ok(result);
    });
  } catch {
    return Result.err(new Error('There was a problem updating label'));
  }
};

export default update;
