export interface SubpageType {
  id: string,
  name: string,
  description: string,
  icon: string,
  creator: {
    id: string,
    username: string,
  },
  createdAt: Date,
}

export interface SubpageCreateType {
  name: string,
  description: string,
  icon: string,
}

export interface SubpageCreateResultType extends SubpageType {
  labels: [{
    id: string,
    name: string,
    orderInSubpabe: number,
    createdAt: Date,
  }],
}

export interface SubpageUpdateType {
  oldName?: string,
  oldDescription?: string,
  oldIcon?: string,
  newName?: string,
  newDescription?: string,
  newIcon?: string,
}

export interface SubpageUpdateResultType {
  id: string,
  name?: string,
  description?: string,
  icon?: string,
}
