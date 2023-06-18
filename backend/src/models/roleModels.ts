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

export interface RoleUpdateType {
  userId: string,
  newRoleType: RoleType, // role enum
  oldRoleType: RoleType, // role enum
}
