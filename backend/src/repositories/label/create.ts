import { Result } from '@badrap/result';
import { LabelDataCreate, LabelResultBody } from '../../controllers/label/create';
import { checkSubpage } from '../common/common';
import client from '../client';
import { genericError } from '../common/types';

const createLabel = async (
  data: LabelDataCreate,
): Promise<Result<LabelResultBody>> => {
  try {
    return await client.$transaction(async (tx) => {
      const subPageExists = await checkSubpage(data.subpageId, tx);
      if (subPageExists.isErr) {
        return Result.err(subPageExists.error);
      }
      const highestOrder = await tx.label.findFirstOrThrow({
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
  } catch {
    return genericError;
  }
};

export default createLabel;
