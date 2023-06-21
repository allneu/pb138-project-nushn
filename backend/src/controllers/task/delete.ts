import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import TaskRepo from '../../repositories/task';
import { handleOkResp } from '../common/handleResponse';
import { taskIdSubpageIdSchema } from '../../models';
import log from '../common/log';

const deleteTask = async (req: Request, res: Response) => {
  try {
    const params = taskIdSubpageIdSchema.parse(req.params);
    const response = await TaskRepo.delete(params);
    return response.isOk
      ? handleOkResp(200, response.value, res, `Deleted task with id ${params.taskId}`)
      : handleErrors(response.error, res);
  } catch (e) {
    return handleErrors(e as Error, res);
  } finally {
    log(req, res);
  }
};

export default deleteTask;
