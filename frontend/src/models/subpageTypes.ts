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
  }],
};

export type SubpageWithLabelsType = SubpageCreateResultType;

export interface SubpageUpdateType {
  oldName?: string,
  oldDescription?: string,
  oldIcon?: string,
  newName?: string,
  newDescription?: string,
  newIcon?: string,
}

export type SubpageUpdateResultType = Partial<SubpageCreateType> & {
  id: string,
};

export type SubpageDeleteResultType = EmptyObject;
