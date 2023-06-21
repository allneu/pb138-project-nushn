import { z } from 'zod';

export const labelCreateSchema = z.object({
  name: z.string().min(3),
}).strict();

export type LabelCreateType = z.infer<typeof labelCreateSchema>;

export type Label = {
  id: string,
  name: string,
  orderInSubpage: number | null,
  createdAt: Date,
};

export type LabelCreateResult = Label; // Prefer use Label - this is for compability

export const labelUpdateSchema = z.object({
  oldName: z.string().min(3).optional(),
  oldOrderInSubpage: z.number().nonnegative().optional(),
  newName: z.string().min(3).optional(),
  newOrderInSubpage: z.number().nonnegative().optional(),
}).strict()
  .refine(
    (data) => (
      (data.newName !== undefined && data.oldName !== undefined)
      || (data.newOrderInSubpage !== undefined && data.oldOrderInSubpage !== undefined)
    ),
    'At least one pair of name, description or icon must be provided.',
  )
  .refine(
    (data) => (
      (data.newName === undefined || data.oldName !== undefined)
      && (data.newOrderInSubpage === undefined || data.oldOrderInSubpage !== undefined)
    ),
    'For each new[] data are old[] data required!',
  );

export type LabelUpdateType = z.infer<typeof labelUpdateSchema>;

export type LabelUpdateResult = {
  id: string,
  name?: string,
  orderInSubpage?: number,
};

export type LabelGetResultBody = {
  id: string;
  name: string;
  orderInSubpage: number | null;
  createdAt: Date;
  tasks: {
    id: string;
    createdAt: Date;
    taskName: string;
    dueDate: string;
    content: string;
    creator: {
      id: string;
      username: string;
    };
    labelId: string;
    orderInLabel: number | null;
    orderInList: number | null;
  }[];
}[];

export type LabelDeleteResult = {
  labelId: string,
};
