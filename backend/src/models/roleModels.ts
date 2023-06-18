import { RoleType } from '@prisma/client';
import { z } from 'zod';

export const roleCreateSchema = z.object({
  role: z.enum(['OWNER', 'EDITOR']),
  userId: z.string().uuid().nonempty(),
}).strict();

export type RoleCreateType = z.infer<typeof roleCreateSchema>;

export interface Role {
  id: string,
  userId: string,
  subpageId: string,
  roleType: RoleType, // role enum
}

export const roleUpdateSchema = z.object({
  oldRole: z.enum(['OWNER', 'EDITOR']),
  newRole: z.enum(['OWNER', 'EDITOR']),
  userId: z.string().uuid().nonempty(),
}).strict();

export type RoleUpdateType = z.infer<typeof roleUpdateSchema>;
