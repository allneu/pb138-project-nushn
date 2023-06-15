import { Result } from '@badrap/result';
import { LabelGetData } from '../../controllers/label/get';
import { checkSubpage } from '../common/common';
import client from '../client';
import { genericError } from '../common/types';

export const getLabelsOfSubpage = async (data: LabelGetData) => {
  try {
    return await client.$transaction(async (tx) => {
      const subPageExists = await checkSubpage(data.subpageId, tx);
      if (subPageExists.isErr) {
        return Result.err(subPageExists.error);
      }
      const labels = await tx.label.findMany({
        where: {
          subPageId: data.subpageId,
          deletedAt: null,
        },
      });
      const labelIds = labels.map((label) => label.id);
      const tasks = await tx.task.findMany({
        where: {
          labelId: {
            in: labelIds,
          },
        },
      });
      return Result.ok({ labels, tasks });
    });
  } catch {
    return genericError;
  }
};

export default getLabelsOfSubpage;
