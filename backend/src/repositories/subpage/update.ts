import { Result } from '@badrap/result';
import {
  SubpageUpdateResult, SubpageUpdateType, UserIdSubpageIdType, oldDataError,
  userHasNotPermissionError,
} from '../../models';
import client from '../client';
import { PrismaTransactionHandle } from '../common/types';
import subpageEditCreate from '../common/subpageUpdate';
import logger from '../../log/log';

const controlLastData = async (
  data: SubpageUpdateType,
  { userId, subpageId }: UserIdSubpageIdType,
  tx: PrismaTransactionHandle,
) => {
  logger.debug({ subpage: { controlLastData: 'start' } });
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
  logger.debug({ subpage: { controlLastData: 'successfull done' } });
  return true;
};

const updateSubpage = async (
  data: SubpageUpdateType,
  { subpageId }: UserIdSubpageIdType,
  tx: PrismaTransactionHandle,
) => {
  logger.debug({ subpage: { updateSubpage: 'start' } });
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
  logger.debug({ subpage: { updateSubpage: 'successfull done' } });
  return subpage;
};

const update = async (
  data: SubpageUpdateType,
  params: UserIdSubpageIdType,
): Promise<Result<SubpageUpdateResult>> => {
  logger.debug({ subpage: { update: 'start' } });
  try {
    return await client.$transaction(async (tx: PrismaTransactionHandle) => {
      await controlLastData(data, params, tx);
      const subpage = await updateSubpage(data, params, tx);
      await subpageEditCreate(params, new Date(), tx);
      logger.debug({ subpage: { update: 'successfull done' } });
      return Result.ok(subpage);
    });
  } catch (e) {
    logger.debug({ subpage: { update: 'error' } });
    return Result.err(e as Error);
  }
};
export default update;
