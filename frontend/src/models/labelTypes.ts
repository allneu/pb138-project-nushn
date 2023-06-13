import { TaskType } from './taskTypes';

export interface LabelType {
  id: string,
  name: string,
  subpageID: string,
  createdAt: string,
  tasks: TaskType[],
}
