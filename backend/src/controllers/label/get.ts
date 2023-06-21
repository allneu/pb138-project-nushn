import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import LabelRepo from '../../repositories/label';
import { subpageIdSchema } from '../../models/urlParamsSchema';
import { handleOkResp } from '../common/handleResponse';
import log from '../common/log';

export const get = async (req: Request, res: Response) => {
  try {
    const params = subpageIdSchema.parse(req.params);
    const response = await LabelRepo.get(params);
    return response.isOk
      ? handleOkResp(200, response.value, res, `Retrieved all labels from subpage: ${params.subpageId}`)
      : handleErrors(response.error, res);
  } catch (e) {
    return handleErrors(e as Error, res);
  } finally {
    log(req, res);
  }
};

export default get;
