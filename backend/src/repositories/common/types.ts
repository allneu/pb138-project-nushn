import { Result } from '@badrap/result';
import type { PrismaClient } from '@prisma/client';

type DbResult<T> = Promise<Result<T>>;

export type PrismaTransactionHandle = Omit<
PrismaClient,
'$connect' | '$disconnect' | '$on' | '$transaction' | '$use'
>;

export type TransactionCheckOperationResult = Promise<Result<object>>;

export default DbResult;
