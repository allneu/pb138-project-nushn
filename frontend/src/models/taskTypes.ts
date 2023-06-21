import EmptyObject from './emptyObject';

export type TaskCreateType = {
  taskName: string,
  dueDate: string,
  content: string,
  labelId?: string,
  creatorId: string,
};

export type TaskCreateResultType = Omit<TaskCreateType, 'labelId' | 'creatorId'> & {
  id: string,
  labelId: string,
  creator: {
    id: string,
    username: string,
  },
  done: boolean,
  orderInList: number,
  orderInLabel: number,
  createdAt: Date,
};

export type TaskType = TaskCreateResultType;

export type TaskUpdateType = {
  taskName?: string,
  dueDate?: string,
  content?: string,
  labelId?: string,
  orderInList?: number,
  orderInLabel?: number,
};

export type TaskUpdateSendType = {
  oldTaskName: string | undefined,
  oldDueDate: string | undefined,
  oldContent: string | undefined,
  oldLabelId: string | undefined,
  oldOrderInList: number | undefined,
  oldOrderInLabel: number | undefined,
  newTaskName: string | undefined,
  newDueDate: string | undefined,
  newContent: string | undefined,
  newLabelId: string | undefined,
  newOrderInList: number | undefined,
  newOrderInLabel: number | undefined,
};

export type TaskUpdateResultType = {
  id: string,
  taskName?: string,
  dueDate?: string,
  content?: string,
  labelId?: string,
  orderInList?: number,
  orderInLabel?: number,
};

export type TaskDeleteResultType = EmptyObject;
