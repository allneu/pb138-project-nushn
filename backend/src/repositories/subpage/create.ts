import { Result } from '@badrap/result';
import {
  Subpage,
  SubpageCreateType, UserIdType, userWasDeletedError,
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
            id: true,
            name: true,
            description: true,
            icon: true,
            labels: {
              select: {
                id: true,
                name: true,
                orderInSubpage: true,
                createdAt: true,
              },
            },
            createdAt: true,
          },
        });
        const role = await roleCreate({ role: 'OWNER' }, { ...params, subpageId: subpage.id }, tx);
        if (role.user.deletedAt !== null) {
          throw userWasDeletedError;
        }
        return subpage;
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default create;
