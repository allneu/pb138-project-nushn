import { ZodError } from 'zod';
import type { Response } from 'express';
import * as er from '../../models';
import { handleErrResp } from './handleResponse';

const errCodes = new Map([
  [er.notimplementedError, { code: 501, msg: 'Not implemented!' }],
  [er.canNotRenameUnlabeledError, { code: 403, msg: 'Sorry, can not rename "unlabeled"!' }],
  [er.canNotCreateUnlabeled, { code: 403, msg: 'Sorry, "unlabeled" is private name!' }],
  [er.wrongSubpageIdError, { code: 404, msg: 'Wrong subpage id!' }],
  [er.labelDoesNotExistError, { code: 404, msg: 'This label does not exist!' }],
  [er.labelWasDeletedError, { code: 404, msg: 'This label was deleted!' }],
  [er.serverInternalError, { code: 500, msg: 'Sorry, we detected an error on server!' }],
  [er.taskDoesNotExistError, { code: 404, msg: 'This task does not exist!' }],
  [er.taskWasDeletedError, { code: 400, msg: 'This task was deleted!' }],
  [er.roleWasDeletedError, { code: 400, msg: 'This role was deleted!' }],
  [er.roleDoesNotExistError, { code: 404, msg: 'This role does not exist!' }],
  [er.oldDataError, { code: 409, msg: 'Sorry. Someone else make update on this data befour you.' }],
  [er.subpageDoesNotExistError, { code: 404, msg: 'This subpage does not exist!' }],
  [er.subpageWasDeletedError, { code: 400, msg: 'This subpage was deleted!' }],
  [er.userHasNotPermissionError, { code: 401, msg: 'Operation was rejected! The user has not enough permission!' }],
  [er.userDoesNotExistError, { code: 404, msg: 'This user does not exist!' }],
  [er.userWasDeletedError, { code: 400, msg: 'This user was deleted!' }],
  [er.invalidPasswordError, { code: 401, msg: 'Invalid password!' }],
  [er.oldPasswordRequiredError, { code: 400, msg: 'For this operation is oldPassword required' }],
  [er.thisRoleExistError, { code: 400, msg: 'This role exist!' }],
]);

const handleErrors = (e: Error, res: Response) => {
  if (e instanceof ZodError) {
    const failResponse = {
      status: 'failure',
      data: e,
      error: 'Validation failed!',
    };
    return res.status(400).send(failResponse);
  }

  const err = errCodes.get(e);
  if (err) {
    return handleErrResp(err.code, e, res, err.msg);
  }

  return handleErrResp(500, e, res, 'An error occurred');
};

export default handleErrors;
