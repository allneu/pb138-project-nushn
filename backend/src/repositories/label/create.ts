import { Result } from '@badrap/result';
import { LabelCreateResult, LabelCreateType } from '../../models/labelModels';
import { SubpageIdType } from '../../models/urlParamsSchema';
import { checkSubpage } from '../common/common';
import client from '../client';

const create = async (
  data: LabelCreateType,
  { subpageId }: SubpageIdType,
): Promise<Result<LabelCreateResult>> => {
  try {
    return await client.$transaction(async (tx) => {
      const subPageExists = await checkSubpage(subpageId, tx);
      if (subPageExists.isErr) {
        throw subPageExists.error;
      }
      const highestOrder = await tx.label.findFirstOrThrow({
        where: { orderInSubpage: { not: null }, subPageId: subpageId },
        orderBy: {
          orderInSubpage: 'desc',
        },
        take: 1,
      });
      const newLabel = await tx.label.create({
        data: {
          name: data.name,
          subPageId: subpageId,
          orderInSubpage: highestOrder.orderInSubpage ? highestOrder.orderInSubpage + 1 : 0,
        },
      });
      return Result.ok({
        id: newLabel.id,
        name: newLabel.name,
        orderInSubpage: newLabel.orderInSubpage,
        createdAt: newLabel.createdAt,
      });
    });
  } catch (e) {
    return Result.err(e as Error);
  }
};
export default create;
