import { Result } from '@badrap/result';
// TODO add LabelResultBody to import and return right value
import { LabelGetResultBody } from '../../models/labelModels';
import { SubpageIdType } from '../../models/urlParamsSchema';
import { checkSubpage } from '../common/common';
import client from '../client';

const get = async (data: SubpageIdType):
Promise<Result<LabelGetResultBody>> => {
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
        orderBy: {
          orderInSubpage: 'asc',
        },
        select: {
          id: true,
          name: true,
          orderInSubpage: true,
          createdAt: true,
          tasks: {
            where: { deletedAt: null },
            select: {
              id: true,
              taskName: true,
              dueDate: true,
              content: true,
              creator: true,
              labelId: true,
              orderInLabel: true,
              orderInList: true,
              createdAt: true,
            },
          },
        },
      });
      return Result.ok(labels);
    });
  } catch {
    return Result.err(new Error('There was a problem getting labels'));
  }
};

export default get;
