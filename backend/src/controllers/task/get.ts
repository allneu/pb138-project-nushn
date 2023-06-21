import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import { subpageIdSchema, taskIdSubpageIdSchema } from '../../models';
import TaskRepo from '../../repositories/task';
import { handleOkResp } from '../common';
import log from '../common/log';

export const getOne = async (req: Request, res: Response) => {
  try {
    const params = taskIdSubpageIdSchema.parse(req.params);
    const response = await TaskRepo.getOne(params);
    return response.isOk
      ? handleOkResp(200, response.value, res, `Listed task with id: ${params.taskId}.`)
      : handleErrors(response.error, res);
  } catch (e) {
    return handleErrors(e as Error, res);
  } finally {
    log(req, res);
  }
};

export const getMultiple = async (req: Request, res: Response) => {
  try {
    const params = subpageIdSchema.parse(req.params);
    const response = await TaskRepo.getMultiple(params);
    return response.isOk
      ? handleOkResp(200, response.value, res, `Listed tasks of subpage with id: ${params.subpageId}.`)
      : handleErrors(response.error, res);
  } catch (e) {
    return handleErrors(e as Error, res);
  } finally {
    log(req, res);
  }
};
