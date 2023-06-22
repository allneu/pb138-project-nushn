import {
  TaskType,
  TaskCreateType,
  TaskCreateResultType,
  TaskUpdateSendType,
  TaskUpdateResultType,
  TaskDeleteResultType,
  ResponseSingle,
  ResponseMulti,
} from '../models';
import axiosInstance from './base';

export const addSingle = async (subpageId: string, body: TaskCreateType):
Promise<ResponseSingle<TaskCreateResultType>> => {
  const response = await axiosInstance.post(`/subpage/${subpageId}/task`, body);
  return response.data;
};

export const getSingle = async (subpageId: string, taskId: string):
Promise<ResponseSingle<TaskType>> => {
  const response = await axiosInstance.get(`/subpage/${subpageId}/task/${taskId}`);
  return response.data;
};

export const getAll = async (subpageId: string): Promise<ResponseMulti<TaskType>> => {
  const response = await axiosInstance.get(`/subpage/${subpageId}/task`);
  return response.data;
};

export const updateSingle = async (subpageId: string, taskId: string, body: TaskUpdateSendType):
Promise<ResponseSingle<TaskUpdateResultType>> => {
  console.log(body);
  const response = await axiosInstance.patch(`/subpage/${subpageId}/task/${taskId}`, body);
  return response.data;
};

export const deleteSingle = async (subpageId: string, taskId: string):
Promise<ResponseSingle<TaskDeleteResultType>> => {
  const response = await axiosInstance.delete(`/subpage/${subpageId}/task/${taskId}`);
  return response.data;
};
