import EmptyObject from './emptyObject';
import { TaskType } from './taskTypes';

export type LabelCreateType = {
  name: string,
};

export type LabelCreateResultType = LabelCreateType & {
  id: string,
  orderInSubpage: number,
  createdAt: Date,
};

export type LabelType = LabelCreateResultType & {
  tasks: TaskType[],
};

export type LabelUpdateType = {
  oldName: string,
  oldOrderInSubpage: number,
  newName: string,
  newOrderInSubpage: number,
};

export type LabelUpdateResultType = {
  id: string,
  name?: string,
  orderInSubpage?: number,
};

export type LabelDeleteResultType = EmptyObject;
