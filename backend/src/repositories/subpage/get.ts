import { Result } from '@badrap/result';
import {
  SubpageWithoutLabels, SubpageWithoutLabelsWithRoleType, UserIdSubpageIdType, UserIdType,
  subpageSelect,
  subpageWasDeletedError, userHasNotPermissionError,
} from '../../models';
import client from '../client';
import { PrismaTransactionHandle } from '../common/types';
import logger from '../../log/log';

export const getOne = async (
  { subpageId, userId }: UserIdSubpageIdType,
): Promise<Result<SubpageWithoutLabels>> => {
  logger.debug({ subpage: { getOne: 'start' } });
  try {
    return await client.$transaction(async (tx: PrismaTransactionHandle) => {
      const { roles, deletedAt, ...subpage } = await tx.subPage.findUniqueOrThrow({
        where: { id: subpageId },
        select: {
          ...subpageSelect,
          deletedAt: true,
          roles: {
            where: { deletedAt: null, userId },
            select: {
              userId: true,
            },
          },
        },
      });
      if (deletedAt !== null) {
        throw subpageWasDeletedError;
      } if (roles.length === 0) {
        throw userHasNotPermissionError;
      }
      logger.debug({ subpage: { getOne: 'successfull done' } });
      return Result.ok(subpage);
    });
  } catch (e) {
    logger.debug({ subpage: { getOne: 'start' } });
    return Result.err(e as Error);
  }
};

export const getMultiple = async (
  { userId }: UserIdType,
): Promise<Result<SubpageWithoutLabelsWithRoleType[]>> => {
  logger.debug({ subpage: { getMultiplegetOne: 'error' } });
  try {
    return await client.$transaction(async (tx: PrismaTransactionHandle) => {
      const subpages = (await tx.role.findMany({
        where: { userId, deletedAt: null },
        select: {
          roleType: true,
          subpage: {
            select: {
              ...subpageSelect,
              deletedAt: true,
            },
          },
        },
      }))
        .filter(({ subpage }) => (subpage.deletedAt === null))
        .map(({ subpage, roleType }) => {
          const { deletedAt, ...resultSubpage } = subpage;
          return { ...resultSubpage, roleType };
        })
        .sort((a, b) => a.createdAt.getDate() - b.createdAt.getDate());
      logger.debug({ subpage: { getMultiplegetOne: 'successfull done' } });
      return Result.ok(subpages);
    });
  } catch (e) {
    logger.debug({ subpage: { getMultiplegetOne: 'error' } });
    return Result.err(e as Error);
  }
};
