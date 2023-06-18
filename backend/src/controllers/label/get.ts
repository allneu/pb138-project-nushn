import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import LabelRepo from '../../repositories/label';
import { subpageIdSchema } from '../../models/urlParamsSchema';
import { handleErrResp, handleOkResp } from '../common/handleResponse';

// validation schema
// res.body type

// functions
export const get = async (req: Request, res: Response) => {
  try {
    const params = subpageIdSchema.parse(req.params);
    const response = await LabelRepo.get(params);
    return response.isOk
      ? handleOkResp(200, response.value, res, `Retrieved all labels from subpage: ${params.subpageId}`)
      : handleErrResp(500, response.error, res, response.error.message);
  } catch (e) {
    return handleErrors(e, res);
  }
};

export default get;
