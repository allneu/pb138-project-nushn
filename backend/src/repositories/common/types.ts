import { Result } from '@badrap/result';
import type { PrismaClient } from '@prisma/client';

type DbResult<T> = Promise<Result<T>>;

export type PrismaTransactionHandle = Omit<
PrismaClient,
'$connect' | '$disconnect' | '$on' | '$transaction' | '$use'
>;

export const genericError = Result.err(
  new Error('Sorry. Some error has occured.'),
);

export default DbResult;
