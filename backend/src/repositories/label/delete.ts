import { Result } from '@badrap/result';
import { LabelDataDelete } from '../../controllers/label/delete';
import { checkSubpage, checkLabel } from '../common/common';
import client from '../client';
import { genericError } from '../common/types';

// TODO
// Find out how to change orderInSubPage parameter when deleting task

const deleteLabel = async (
  data: LabelDataDelete,
): Promise<Result<object>> => {
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
      const deletedAt = new Date();
      // get curr order
      const currOrder = await tx.label.findFirst({
        where: { id: data.labelId },
        select: { orderInSubpage: true },
      });
      // delete the label and set order to null
      await tx.label.update({
        where: { id: data.labelId },
        data: { deletedAt, orderInSubpage: null },
      });
      // TODO test tommorow
      const updateAllHigher = await tx.label.updateMany({
        where: {
          orderInSubpage: {
            not: null,
            gt: currOrder!.orderInSubpage!,
          },
        },
        data: { orderInSubpage: { increment: -1 } },
      });
      console.log(updateAllHigher);
      return Result.ok({});
    });
  } catch {
    return genericError;
  }
};

export default deleteLabel;
