import EmptyObject from './emptyObject';
import { TaskType } from './taskTypes';

export type LabelCreateType = {
  name: string,
};

export type LabelCreateResultType = {
  id: string,
  name: string,
  orderInSubpage: number,
  createdAt: Date,
};

export type LabelType = LabelCreateResultType;

export type LabelWithTasksType = LabelType & {
  tasks: TaskType[],
};

export type LabelUpdateType = {
  name?: string,
  orderInSubpage?: number,
};

export type LabelUpdateSendType = {
  oldName: string | undefined,
  oldOrderInSubpage: number | undefined,
  newName: string | undefined,
  newOrderInSubpage: number | undefined,
};

export type LabelUpdateResultType = {
  id: string,
  name?: string,
  orderInSubpage?: number,
};

export type LabelDeleteResultType = {
  labelId: string,
};
