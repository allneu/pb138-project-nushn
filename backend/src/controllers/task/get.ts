import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import { subpageIdSchema, taskIdSubpageIdSchema } from '../../repositories/models/urlParamsSchema';
import TaskRepo from '../../repositories/task';
import { handleErrResp, handleOkResp } from '../common/handleResponse';

// functions
export const getOne = async (req: Request, res: Response) => {
  try {
    const params = taskIdSubpageIdSchema.parse(req.params);
    const response = await TaskRepo.getOne(params);
    return response.isOk
      ? handleOkResp(200, response.value, res, `Retrieved task ${params.taskId} from subpage: ${params.subpageId}`)
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
      ? handleOkResp(200, response.value, res, `Retrieved all tasks from ${params.subpageId}`)
      : handleErrResp(500, response.error, res, response.error.message);
  } catch (e) {
    return handleErrors(e, res);
  }
};
