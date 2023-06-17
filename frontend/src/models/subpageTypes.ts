export type SubpageCreateType = {
  name: string,
  description: string,
  icon: string,
};

export type SubpageCreateResultType = SubpageCreateType & {
  id: string,
  creator: {
    id: string,
    username: string,
  },
  createdAt: Date,
  labels: [{
    id: string,
    name: string,
    orderInSubpabe: number,
    createdAt: Date,
  }],
};

export type SubpageType = SubpageCreateResultType;

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

export type SubpageDeleteResultType = object;
