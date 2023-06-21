import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import TaskRepo from '../../repositories/task';
import { handleErrResp, handleOkResp } from '../common/handleResponse';
import { taskIdSubpageIdSchema } from '../../models';
import log from '../common/log';

// result code should be 204

// function
const deleteTask = async (req: Request, res: Response) => {
  try {
    const params = taskIdSubpageIdSchema.parse(req.params);
    const response = await TaskRepo.delete(params);
    return response.isOk
      ? handleOkResp(200, response.value, res, `Deleted task with id ${params.taskId}`)
      : handleErrResp(500, response.error, res, response.error.message);
  } catch (e) {
    return handleErrors(e, res);
  } finally {
    log(req, res);
  }
};

export default deleteTask;
