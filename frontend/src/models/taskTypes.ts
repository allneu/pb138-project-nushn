export type TaskCreateType = {
  taskName: string,
  dueDate: Date,
  content: string,
  labelId: string,
  creatorId: string,
};

export type TaskCreateResultType = Omit<TaskCreateType, 'creatorId'> & {
  id: string,
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
  oldTaskName?: string,
  oldDueDate?: Date,
  oldContent?: string,
  oldLabelId?: string,
  oldOrderInList?: number,
  oldOrderInLabel?: number,
  newTaskName?: string,
  newDueDate?: Date,
  newContent?: string,
  newLabelId?: string,
  newOrderInList?: number,
  newOrderInLabel?: number,
};

export type TaskUpdateResultType = {
  id: string,
  taskName?: string,
  dueDate?: Date,
  content?: string,
  labelId?: string,
  orderInList?: number,
  orderInLabel?: number,
};

export type TaskDeleteResultType = object;
