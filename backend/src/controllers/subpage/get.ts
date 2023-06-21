import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import { userIdSchema, userIdSubpageIdSchema } from '../../models';
import SubpageRepos from '../../repositories/subpage';
import { handleErrResp, handleOkResp } from '../common';
import log from '../common/log';

// TODO: add param to choise result data

// validation schema
// getOne == userIdSubpageIdSchema
// getMultiple == userIdSchema

// res.body type
// getOne == Subpage
// getMultiple == GetMultiple<Subpage>

// functions
export const getOne = async (req: Request, res: Response) => {
  try {
    const params = userIdSubpageIdSchema.parse(req.params);
    const response = await SubpageRepos.getOne(params);
    return response.isOk
      ? handleOkResp(200, response.value, res, `Listed subpage with id: ${params.subpageId}.`)
      : handleErrResp(500, response.error, res, response.error.message);
  } catch (e) {
    return handleErrors(e, res);
  } finally {
    log(req, res);
  }
};

export const getMultiple = async (req: Request, res: Response) => {
  try {
    const params = userIdSchema.parse(req.params);
    const response = await SubpageRepos.getMultiple(params);
    return response.isOk
      ? handleOkResp(200, response.value, res, `Listed subpages of user with id: ${params.userId}.`)
      : handleErrResp(500, response.error, res, response.error.message);
  } catch (e) {
    return handleErrors(e, res);
  } finally {
    log(req, res);
  }
};
