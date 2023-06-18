import { Result } from '@badrap/result';
import {
  Subpage, SubpageWithRole, UserIdSubpageIdType, UserIdType,
  labelSelect,
  subpageSelect,
  subpageWasDeletedError, userHasNotPermissionError,
} from '../../models';
import client from '../client';
import { PrismaTransactionHandle } from '../common/types';

export const getOne = async (
  { subpageId, userId }: UserIdSubpageIdType,
): Promise<Result<Subpage>> => {
  try {
    return Result.ok(
      await client.$transaction(async (tx: PrismaTransactionHandle) => {
        const { roles, deletedAt, ...subpage } = await tx.subPage.findUniqueOrThrow({
          where: { id: subpageId },
          select: {
            ...subpageSelect,
            deletedAt: true,
            labels: { select: labelSelect },
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
        return subpage;
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export const getMultiple = async ({ userId }: UserIdType): Promise<Result<SubpageWithRole[]>> => {
  try {
    return Result.ok(
      await client.$transaction(async (tx: PrismaTransactionHandle) => {
        const subpages = (await tx.role.findMany({
          where: { userId, deletedAt: null },
          select: {
            roleType: true,
            subpage: {
              select: {
                ...subpageSelect,
                deletedAt: true,
                labels: { select: labelSelect },
              },
            },
          },
        }))
          .filter(({ subpage }) => (subpage.deletedAt === null))
          .map(({ subpage, roleType }) => {
            const { deletedAt, ...resultSubpage } = subpage;
            return { ...resultSubpage, roleType };
          });
        return subpages;
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};
