import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import TaskRepo from '../../repositories/task';
import { handleOkResp } from '../common/handleResponse';
import { subpageIdSchema, taskCreateSchema } from '../../models';
import log from '../common/log';

const create = async (req: Request, res: Response) => {
  try {
    const data = taskCreateSchema.parse(req.body);
    const params = subpageIdSchema.parse(req.params);
    subpageIdSchema.parse(req.params);
    const response = await TaskRepo.create(data, params);
    return response.isOk
      ? handleOkResp(201, response.value, res, `Created label with id: ${response.value.id}`)
      : handleErrors(response.error, res);
  } catch (e) {
    return handleErrors(e as Error, res);
  } finally {
    log(req, res);
  }
};

export default create;
