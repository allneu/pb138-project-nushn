import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import { taskIdSubpageIdSchema } from '../../repositories/models/urlParamsSchema';
import TaskRepo from '../../repositories/task';
import { handleErrResp, handleOkResp } from '../common/handleResponse';

// result code should be 204

// function
const deleteTask = async (req: Request, res: Response) => {
  try {
    const params = taskIdSubpageIdSchema.parse(req.params);
    const response = await TaskRepo.deleteTask(params);
    return response.isOk
      ? handleOkResp(204, response.value, res, `Deleted task with id ${params.taskId}`)
      : handleErrResp(500, response.error, res, response.error.message);
  } catch (e) {
    return handleErrors(e, res);
  }
};

export default deleteTask;
