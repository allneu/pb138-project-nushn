import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import { subpageIdSchema, taskIdSubpageIdSchema } from '../../models';
import TaskRepo from '../../repositories/task';
import { handleErrResp, handleOkResp } from '../common';

// functions
export const getOne = async (req: Request, res: Response) => {
  try {
    const params = taskIdSubpageIdSchema.parse(req.params);
    const response = await TaskRepo.getOne(params);
    return response.isOk
      ? handleOkResp(200, response.value, res, `Listed task with id: ${params.taskId}.`)
      : handleErrResp(500, response.error, res, response.error.message);
  } catch (e) {
    return handleErrors(e, res);
  }
};

export const getMultiple = async (req: Request, res: Response) => {
  try {
    const params = subpageIdSchema.parse(req.params);
    const response = await TaskRepo.getMultiple(params);
    return response.isOk
      ? handleOkResp(200, response.value, res, `Listed tasks of subpage with id: ${params.subpageId}.`)
      : handleErrResp(500, response.error, res, response.error.message);
  } catch (e) {
    return handleErrors(e, res);
  }
};
