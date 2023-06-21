import axios from 'axios';
import {
  UserLoginType,
  UserLoginResultType,
  UserLogoutResultType,
  UserCreateType,
  UserCreateResultType,
  UserType,
  UserUpdateType,
  UserUpdateResultType,
  UserDeleteResultType,
  ResponseSingle,
  ResponseMulti,
  UsersSearchType,
} from '../models';
import axiosInstance from './base';

export const auth = async (): Promise<ResponseSingle<UserType>> => {
  const resp = await axiosInstance.get('/user/auth');
  return resp.data;
};

export const login = async (body: UserLoginType):
Promise<ResponseSingle<UserLoginResultType>> => {
  const resp = await axiosInstance.post('/user/login', body);
  return resp.data;
};

export const logout = async (): Promise<ResponseSingle<UserLogoutResultType>> => {
  const resp = await axiosInstance.post('/user/logout', {});
  return resp.data;
};

export const addSingle = async (body: UserCreateType):
Promise<ResponseSingle<UserCreateResultType>> => {
  const response = await axiosInstance.post('/user', body);
  return response.data;
};

export const getSingle = async (userId: string):
Promise<ResponseSingle<UserType>> => {
  const response = await axiosInstance.get(`/user/${userId}`);
  return response.data;
};

export const getAll = async (body: UsersSearchType): Promise<ResponseMulti<UserType>> => {
  const response = await axiosInstance.get('/user', { params: body });
  return response.data;
};

export const updateSingle = async (userId: string, body: UserUpdateType):
Promise<ResponseSingle<UserUpdateResultType>> => {
  const response = await axiosInstance.patch(`/user/${userId}`, body);
  return response.data;
};

export const deleteSingle = async (userId: string):
Promise<ResponseSingle<UserDeleteResultType>> => {
  const response = await axiosInstance.delete(`/user/${userId}`);
  return response.data;
};
