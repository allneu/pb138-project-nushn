import {
  LabelType,
  LabelCreateType,
  LabelCreateResultType,
  LabelUpdateType,
  LabelUpdateResultType,
  LabelDeleteResultType,
  ResponseSingle,
  ResponseMulti,
} from '../models';
import axiosInstance from './base';

export const addSingle = async (subpageId: string, body: LabelCreateType):
Promise<ResponseSingle<LabelCreateResultType>> => {
  const response = await axiosInstance.post(`/subpage/${subpageId}/label`, body);
  return response.data;
};

export const getAll = async (subpageId: string): Promise<ResponseMulti<LabelType>> => {
  const response = await axiosInstance.get(`/subpage/${subpageId}/label`);
  return response.data;
};

export const updateSingle = async (subpageId: string, labelId: string, body: LabelUpdateType):
Promise<ResponseSingle<LabelUpdateResultType>> => {
  const response = await axiosInstance.patch(`/subpage/${subpageId}/label/${labelId}`, body);
  return response.data;
};

export const deleteSingle = async (subpageId: string, labelId: string):
Promise<ResponseSingle<LabelDeleteResultType>> => {
  const response = await axiosInstance.delete(`/subpage/${subpageId}/label/${labelId}`);
  return response.data;
};
