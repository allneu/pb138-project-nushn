import EmptyObject from './emptyObject';

export type SubpageCreateType = {
  name: string,
  description: string,
  icon: string,
};

export type SubpageType = SubpageCreateType & {
  id: string,
  creator: {
    id: string,
    username: string,
  },
  createdAt: Date,
};

export type SubpageCreateResultType = SubpageType & {
  labels: [{
    id: string,
    name: string,
    orderInSubpage: number,
    createdAt: Date,
    tasks: {
      id: string,
      creator: {
        id: string,
        username: string,
      },
      done: boolean,
      orderInList: number,
      orderInLabel: number,
      createdAt: Date,
    }[]
  }],
};

export type SubpageUpdateType = Partial<SubpageCreateType>;

export type SubpageUpdateSendType = {
  oldName: string | undefined,
  oldDescription: string | undefined,
  oldIcon: string | undefined,
  newName: string | undefined,
  newDescription: string | undefined,
  newIcon: string | undefined,
};

export type SubpageUpdateResultType = Partial<SubpageCreateType> & {
  id: string,
};

export type SubpageDeleteResultType = EmptyObject;
