import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import LabelRepo from '../../repositories/label';
import { labelIdSubpageIdSchema } from '../../models/urlParamsSchema';
import { handleErrResp, handleOkResp } from '../common/handleResponse';
import log from '../common/log';

// result code should be 204

// validation schema
// res.body type
// {}

// function
const deleteLabel = async (req: Request, res: Response) => {
  try {
    const params = labelIdSubpageIdSchema.parse(req.params);
    const response = await LabelRepo.deleteLabel(params);
    return response.isOk
      ? handleOkResp(204, response.value, res, `Deleted label with id ${params.labelId}`)
      : handleErrResp(500, response.error, res, response.error.message);
  } catch (e) {
    return handleErrors(e, res);
  } finally {
    log(req, res);
  }
};

export default deleteLabel;
