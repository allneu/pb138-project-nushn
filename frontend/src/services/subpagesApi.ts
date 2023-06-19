import {
  SubpageType,
  SubpageWithLabelsType,
  SubpageCreateType,
  SubpageCreateResultType,
  SubpageUpdateType,
  SubpageUpdateResultType,
  SubpageDeleteResultType,
  ResponseSingle,
  ResponseMulti,
} from '../models';
import axiosInstance from './base';

export const addSingle = async (userId: string, body: SubpageCreateType):
Promise<ResponseSingle<SubpageCreateResultType>> => {
  const response = await axiosInstance.post(`/user/${userId}/subpage`, body);
  return response.data;
};

export const getSingle = async (userId: string, subpageId: string):
Promise<ResponseSingle<SubpageWithLabelsType>> => {
  const response = await axiosInstance.get(`/user/${userId}/subpage/${subpageId}`);
  return response.data;
};

export const getAll = async (userId: string): Promise<ResponseMulti<SubpageType>> => {
  const response = await axiosInstance.get(`/user/${userId}/subpage`);
  return response.data;
};

export const updateSingle = async (userId: string, subpageId: string, body: SubpageUpdateType):
Promise<ResponseSingle<SubpageUpdateResultType>> => {
  const response = await axiosInstance.patch(`/user/${userId}/subpage/${subpageId}`, body);
  return response.data;
};

export const deleteSingle = async (userId: string, subpageId: string):
Promise<ResponseSingle<SubpageDeleteResultType>> => {
  const response = await axiosInstance.delete(`/user/${userId}/subpage/${subpageId}`);
  return response.data;
};
