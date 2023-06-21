import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import TaskRepo from '../../repositories/task';
import { taskIdSubpageIdSchema, taskUpdateSchema, userHasNotPermissionError } from '../../models';
import { handleOkResp } from '../common';
import log from '../common/log';

const update = async (req: Request, res: Response) => {
  try {
    const params = taskIdSubpageIdSchema.parse(req.params);
    const data = taskUpdateSchema.parse(req.body);
    const userId = req.session.user?.id;
    if (!userId) {
      throw userHasNotPermissionError;
    }
    const response = await TaskRepo.update(data, params, { userId });
    return response.isOk
      ? handleOkResp(200, response.value, res, `Updated task with id: ${params.taskId}.`)
      : handleErrors(response.error, res);
  } catch (e) {
    return handleErrors(e as Error, res);
  } finally {
    log(req, res);
  }
};

export default update;
