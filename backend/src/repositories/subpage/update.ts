import { Result } from '@badrap/result';
import {
  SubpageUpdateResult, SubpageUpdateType, UserIdSubpageIdType, oldDataError,
  userHasNotPermissionError,
} from '../../models';
import client from '../client';
import { PrismaTransactionHandle } from '../common/types';
import subpageEditCreate from '../common/subpageUpdate';

const controlLastData = async (
  data: SubpageUpdateType,
  { userId, subpageId }: UserIdSubpageIdType,
  tx: PrismaTransactionHandle,
) => {
  const subpage = await tx.subPage.findUniqueOrThrow({
    where: { id: subpageId },
    select: {
      name: true,
      description: true,
      icon: true,
      roles: {
        where: { userId },
      },
    },
  });
  if (subpage.roles.length === 0) {
    throw userHasNotPermissionError;
  } if (
    (data.newDescription && data.oldDescription !== subpage.description)
    || (data.newName && data.oldName !== subpage.name)
    || (data.newIcon && data.oldIcon !== subpage.icon)
  ) {
    throw oldDataError;
  }
  return true;
};

const updateSubpage = async (
  data: SubpageUpdateType,
  { subpageId }: UserIdSubpageIdType,
  tx: PrismaTransactionHandle,
) => {
  const name = data.newName ? { name: data.newName } : {};
  const description = data.newDescription ? { description: data.newDescription } : {};
  const icon = data.newIcon ? { icon: data.newIcon } : {};
  const subpage = await tx.subPage.update({
    where: { id: subpageId },
    data: { ...name, ...description, ...icon },
    select: {
      id: true,
      name: data.newName !== undefined,
      description: data.newDescription !== undefined,
      icon: data.newIcon !== undefined,
    },
  });
  return subpage;
};

const update = async (
  data: SubpageUpdateType,
  params: UserIdSubpageIdType,
): Promise<Result<SubpageUpdateResult>> => {
  try {
    return Result.ok(
      await client.$transaction(async (tx: PrismaTransactionHandle) => {
        await controlLastData(data, params, tx);
        const subpage = await updateSubpage(data, params, tx);
        subpageEditCreate(params, new Date(), tx);
        return subpage;
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};
export default update;
