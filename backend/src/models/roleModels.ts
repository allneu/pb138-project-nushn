import { RoleType } from '@prisma/client';
import { z } from 'zod';

export const roleCreateSchema = z.object({
  role: z.enum([RoleType.EDITOR, RoleType.OWNER]),
  userId: z.string().uuid().nonempty(),
});

export type RoleCreateType = z.infer<typeof roleCreateSchema>;

export interface Role {
  id: string,
  userId: string,
  subpageId: string,
  roleType: RoleType, // role enum
}

export const roleUpdateSchema = z.object({
  oldRole: z.enum([RoleType.EDITOR, RoleType.OWNER]),
  newRole: z.enum([RoleType.EDITOR, RoleType.OWNER]),
  userId: z.string().uuid().nonempty(),
}).strict();

export type RoleUpdateType = z.infer<typeof roleUpdateSchema>;
