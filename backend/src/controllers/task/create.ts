import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import { taskCreateSchema } from '../../repositories/models/taskModels';
import { subpageIdSchema } from '../../repositories/models/urlParamsSchema';
import TaskRepo from '../../repositories/task';
import { handleErrResp, handleOkResp } from '../common/handleResponse';

// result code should be 201

// function
const create = async (req: Request, res: Response) => {
  try {
    const data = taskCreateSchema.parse(req.body);
    // should I send also subpageId?
    subpageIdSchema.parse(req.params);
    const response = await TaskRepo.create(data);
    return response.isOk
      ? handleOkResp(201, response.value, res, `Created label with id: ${response.value.id}`)
      : handleErrResp(500, response.error, res, response.error.message);
  } catch (e) {
    return handleErrors(e, res);
  }
};

export default create;
