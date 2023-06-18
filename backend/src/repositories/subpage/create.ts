import { Result } from '@badrap/result';
import {
  Subpage,
  SubpageCreateType, UserIdType, labelSelect, subpageSelect, userWasDeletedError,
} from '../../models';
import client from '../client';
import { PrismaTransactionHandle } from '../common/types';
import roleCreate from '../common/role';

const create = async (
  data: SubpageCreateType,
  params: UserIdType,
): Promise<Result<Subpage>> => {
  try {
    return Result.ok(
      await client.$transaction(async (tx: PrismaTransactionHandle) => {
        const subpage = await tx.subPage.create({
          data,
          select: {
            ...subpageSelect,
            labels: { select: labelSelect },
          },
        });
        const role = await roleCreate({ role: 'OWNER' }, { ...params, subpageId: subpage.id }, tx);
        if (role.user.deletedAt !== null) {
          throw userWasDeletedError;
        }
        const label = await tx.label.create({
          data: {
            name: 'unlabeled',
            subPageId: subpage.id,
            orderInSubpage: 0,
          },
          select: labelSelect,
        });
        subpage.labels = [...subpage.labels, label];
        return subpage;
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default create;
