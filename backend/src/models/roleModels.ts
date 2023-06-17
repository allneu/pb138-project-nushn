import { z } from 'zod';

export const roleCreateSchema = z.object({
  role: z.enum(['owner', 'editor']),
}).strict();

export type RoleCreateType = z.infer<typeof roleCreateSchema>;

export interface RoleType {
  userId: string,
  subpageId: string,
  role: Role, // role enum
}

export enum Role {
  Owner = 'OWNER',
  Editor = 'EDITOR',
}
