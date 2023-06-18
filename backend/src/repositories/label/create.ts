import { Result } from '@badrap/result';
import { LabelCreateResult, LabelCreateType } from '../../models/labelModels';
import { SubpageIdType } from '../../models/urlParamsSchema';
import { checkSubpage } from '../common/common';
import client from '../client';

const create = async (
  data: LabelCreateType & SubpageIdType,
): Promise<Result<LabelCreateResult>> => {
  try {
    return await client.$transaction(async (tx) => {
      const subPageExists = await checkSubpage(data.subpageId, tx);
      if (subPageExists.isErr) {
        return Result.err(subPageExists.error);
      }
      const highestOrder = await tx.label.findFirstOrThrow({
        where: { orderInSubpage: { not: null } },
        orderBy: {
          orderInSubpage: 'desc',
        },
        take: 1,
      });
      const newLabel = await tx.label.create({
        data: {
          name: data.name,
          subPageId: data.subpageId,
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
    return Result.err(new Error('There was a problem in label creation'));
  }
};
export default create;
