import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import { userIdSchema, userIdSubpageIdSchema } from '../../models';
import SubpageRepos from '../../repositories/subpage';
import { handleOkResp } from '../common';
import log from '../common/log';

export const getOne = async (req: Request, res: Response) => {
  try {
    const params = userIdSubpageIdSchema.parse(req.params);
    const response = await SubpageRepos.getOne(params);
    return response.isOk
      ? handleOkResp(200, response.value, res, `Listed subpage with id: ${params.subpageId}.`)
      : handleErrors(response.error, res);
  } catch (e) {
    return handleErrors(e as Error, res);
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
      : handleErrors(response.error, res);
  } catch (e) {
    return handleErrors(e as Error, res);
  } finally {
    log(req, res);
  }
};
