import { Result } from '@badrap/result';
import { Deleted, UserIdSubpageIdType } from '../../../models';
import { PrismaTransactionHandle } from '../../common/types';
import client from '../../client';

const roleDelete = async (
  { userId, subpageId }: UserIdSubpageIdType,
  tx: PrismaTransactionHandle,
) => {
  await tx.role.updateMany({
    where: { userId, subpageId, deletedAt: null },
    data: { deletedAt: new Date() },
  });
};

const deleteRole = async (params : UserIdSubpageIdType): Promise<Result<Deleted>> => {
  try {
    return Result.ok(
      await client.$transaction(async (tx: PrismaTransactionHandle) => {
        await roleDelete(params, tx);
        return {};
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default deleteRole;
