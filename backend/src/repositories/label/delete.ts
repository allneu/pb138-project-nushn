import { Result } from '@badrap/result';
import { LabelIdSubpageIdType } from '../../models/urlParamsSchema';
import { checkSubpage, checkLabel } from '../common/common';
import client from '../client';
import { LabelDeleteResult } from '../../models/labelModels';

const deleteLabel = async (
  data: LabelIdSubpageIdType,
): Promise<Result<LabelDeleteResult>> => {
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
      const currOrder = await tx.label.findFirstOrThrow({
        where: { id: data.labelId },
        select: { orderInSubpage: true, id: true },
      });
      // delete the label and set order to null
      await tx.label.update({
        where: { id: data.labelId },
        data: { deletedAt, orderInSubpage: null },
      });
      await tx.label.updateMany({
        where: {
          orderInSubpage: {
            not: null,
            gt: currOrder.orderInSubpage ? currOrder.orderInSubpage : 0,
          },
        },
        data: { orderInSubpage: { increment: -1 } },
      });
      return Result.ok({ labelId: currOrder.id });
    });
  } catch {
    return Result.err(new Error('There was a problem deleting task'));
  }
};

export default deleteLabel;
