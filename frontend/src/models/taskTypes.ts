export interface TaskType {
  id: string,
  name: string,
  status: boolean,
  dueDate: Date,
  icon: string,
  labelId: string,
  creatorID: string,
  content: string,
  createdAt: Date,
}

export interface CreateTaskType {
  id: string,
  name: string,
  status: boolean,
  dueDate: Date,
  icon: string,
  labelId: string,
  creatorID: string,
  content: string,
}

export interface EditTaskType {
  id: string,
  name: string,
  status: boolean,
  dueDate: string,
  icon: string,
  labelId: string,
  creatorID: string,
  content: string,
  createdAt?: Date,
}
