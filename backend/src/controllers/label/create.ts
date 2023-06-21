import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import { labelCreateSchema } from '../../models/labelModels';
import LabelRepo from '../../repositories/label';
import { subpageIdSchema } from '../../models/urlParamsSchema';
import { handleErrResp, handleOkResp } from '../common/handleResponse';
import log from '../common/log';

// result code should be 201

// function
const create = async (req: Request, res: Response) => {
  try {
    const data = labelCreateSchema.parse(req.body);
    const params = subpageIdSchema.parse(req.params);
    const response = await LabelRepo.create({ ...data, ...params });
    return response.isOk
      ? handleOkResp(201, response.value, res, `Created label with id: ${response.value.id}`)
      : handleErrResp(500, response.error, res, response.error.message);
  } catch (e) {
    return handleErrors(e, res);
  } finally {
    log(req, res);
  }
};

export default create;
