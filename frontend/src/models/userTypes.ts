import EmptyObject from './emptyObject';

export type UserLoginType = {
  email: string,
  password: string,
};

export type UserLoginResultType = EmptyObject;

export type UserLogoutResultType = EmptyObject;

export type UserCreateType = {
  username: string,
  email: string,
  password: string,
};

export type UserCreateResultType = {
  id: string,
  username: string,
  email: string,
};

export type UserType = UserCreateResultType & {
  avatar?: string,
};

export type UserUpdateType = {
  username?: string,
  email?: string,
  avatar?: string,
  newPassword?: string,
  oldPassword?: string,
};

export type UserUpdateResultType = UserUpdateType & {
  id: string,
};

export type UserDeleteResultType = EmptyObject;

export type UsersSearchType = {
  username: string,
  count: number,
};
