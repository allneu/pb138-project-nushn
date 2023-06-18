import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import TaskRepo from '../../repositories/task';
import { taskIdSubpageIdSchema, taskUpdateSchema } from '../../models';
import { handleErrResp, handleOkResp } from '../common';

// result code should be 201

// function
const update = async (req: Request, res: Response) => {
  try {
    const params = taskIdSubpageIdSchema.parse(req.params);
    const data = taskUpdateSchema.parse(req.body);
    const response = await TaskRepo.update(data, params);
    return response.isOk
      ? handleOkResp(200, response.value, res, `Updated task with id: ${params.taskId}.`)
      : handleErrResp(500, response.error, res, response.error.message);
  } catch (e) {
    return handleErrors(e, res);
  }
};

export default update;
