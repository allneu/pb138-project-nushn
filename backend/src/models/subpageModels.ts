import { RoleType } from '@prisma/client';
import { z } from 'zod';
import { LabelCreateResult } from './labelModels';

export const subpageCreateSchema = z.object({
  name: z.string().min(3),
  description: z.string().nonempty(),
  icon: z.string().nonempty(),
}).strict();

export type SubpageCreateType = z.infer<typeof subpageCreateSchema>;

export const subpageUpdateSchema = z.object({
  oldName: z.string().min(3).optional(),
  oldDescription: z.string().nonempty().optional(),
  oldIcon: z.string().nonempty().optional(),
  newName: z.string().min(3).optional(),
  newDescription: z.string().nonempty().optional(),
  newIcon: z.string().nonempty().optional(),
}).strict()
  .refine(
    (data) => (
      (data.newName !== undefined && data.oldName !== undefined)
      || (data.newDescription !== undefined && data.oldDescription !== undefined)
      || (data.newIcon !== undefined && data.oldIcon !== undefined)
    ),
    'At least one pair of name, description or icon must be provided.',
  )
  .refine(
    (data) => (
      (data.newName === undefined || data.oldName !== undefined)
      && (data.newDescription === undefined || data.oldDescription !== undefined)
      && (data.newIcon === undefined || data.oldIcon !== undefined)
    ),
    'For each new[] data are old[] data required!',
  );

export type SubpageUpdateType = z.infer<typeof subpageUpdateSchema>;

export type Subpage = SubpageWithoutLabels & {
  labels: LabelCreateResult[],
};

export type SubpageWithoutLabels = {
  id: string,
  name: string,
  description: string,
  icon: string,
  createdAt: Date,
};

export type SubpageWithoutLabelsWithRoleType = SubpageWithoutLabels & {
  roleType: RoleType,
};

export const labelSelect = {
  id: true,
  name: true,
  orderInSubpage: true,
  createdAt: true,
  tasks: true,
};

export const subpageSelect = {
  id: true,
  name: true,
  description: true,
  icon: true,
  createdAt: true,
};

export type SubpageWithRole = Subpage & {
  roleType: RoleType,
};

export interface SubpageUpdateResult { // return only id and updated data
  id: string,
  name?: string,
  description?: string,
  icon?: string,
}
