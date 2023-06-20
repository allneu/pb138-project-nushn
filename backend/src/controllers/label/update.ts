import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import LabelRepo from '../../repositories/label';
import { labelIdSubpageIdSchema } from '../../models/urlParamsSchema';
import { labelUpdateSchema } from '../../models/labelModels';
import { handleErrResp, handleOkResp } from '../common/handleResponse';

// result code should be 201

// function
export const update = async (req: Request, res: Response) => {
  try {
    const params = labelIdSubpageIdSchema.parse(req.params);
    const data = labelUpdateSchema.parse(req.body);
    const response = await LabelRepo.update(data, params);
    return response.isOk
      ? handleOkResp(201, response.value, res, `Updated label with id: ${params.labelId}`)
      : handleErrResp(500, response.error, res, response.error.message);
  } catch (e) {
    return handleErrors(e, res);
  }
};

export default update;
