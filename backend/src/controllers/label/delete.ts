import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import LabelRepo from '../../repositories/label';
import { labelIdSubpageIdSchema } from '../../models/urlParamsSchema';
import { handleOkResp } from '../common/handleResponse';
import log from '../common/log';
import { userHasNotPermissionError } from '../../models';

const deleteLabel = async (req: Request, res: Response) => {
  try {
    const params = labelIdSubpageIdSchema.parse(req.params);
    const userId = req.session.user?.id;
    if (!userId) {
      throw userHasNotPermissionError;
    }
    const response = await LabelRepo.delete(params, userId);
    return response.isOk
      ? handleOkResp(200, response.value, res, `Deleted label with id ${params.labelId}`)
      : handleErrors(response.error, res);
  } catch (e) {
    return handleErrors(e as Error, res);
  } finally {
    log(req, res);
  }
};

export default deleteLabel;
