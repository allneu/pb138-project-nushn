import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import TaskRepo from '../../repositories/task';
import { handleErrResp, handleOkResp } from '../common/handleResponse';
import { subpageIdSchema, taskCreateSchema } from '../../models';

// result code should be 201

// function
const create = async (req: Request, res: Response) => {
  try {
    const data = taskCreateSchema.parse(req.body);
    const params = subpageIdSchema.parse(req.params);
    subpageIdSchema.parse(req.params);
    const response = await TaskRepo.create(data, params);
    return response.isOk
      ? handleOkResp(201, response.value, res, `Created label with id: ${response.value.id}`)
      : handleErrResp(500, response.error, res, response.error.message);
  } catch (e) {
    return handleErrors(e, res);
  }
};

export default create;
