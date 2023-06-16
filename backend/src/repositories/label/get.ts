import { Result } from '@badrap/result';
import { LabelGetData } from '../../controllers/label/get';
import { checkSubpage } from '../common/common';
import client from '../client';

//TODO fix return type so that each label has list of tasks instead of all tasks

const get = async (data: LabelGetData) => {
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
    return Result.err(new Error('There was a problem getting labels'));
  }
};

export default get;
