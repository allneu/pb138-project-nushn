export const genericError = new Error('Sorry. Some error has occured.');

export const notimplementedError = new Error('Sorry. This function has not been implemented.');

export const userWasDeletedError = new Error('This user was deleted!');

export const userDoesNotExistError = new Error('This user does not exist!');

export const userHasNotPermissionError = new Error('Operation was rejected! The user has not enough permission!');

export const subpageWasDeletedError = new Error('This subpage was deleted!');

export const subpageDoesNotExistError = new Error('This subpage does not exist!');

export const oldDataError = new Error('Sorry. Someone else make update on this data befour you.');

export const roleDoesNotExistError = new Error('This role does not exist!');

export const roleWasDeletedError = new Error('This role was deleted!');

export const taskWasDeletedError = new Error('This task was deleted!');

export const taskDoesNotExistError = new Error('This task does not exist!');

export const serverInternalError = new Error('Sorru, we detected an error!');

export const labelWasDeletedError = new Error('This label was deleted!');

export const labelDoesNotExistError = new Error('This label does not exist!');

export const wrongSubpageIdError = new Error('Wrong subpage id!');

export const canNotCreateUnlabeled = new Error('Sorry, "unlabeled" is private name!');

export const canNotRenameUnlabeledError = new Error('Sorry, can not rename "unlabeled"!');

export const oldPasswordRequiredError = new Error('For this operation is oldPassword required');

export const invalidPasswordError = new Error('Invalid password!');
