import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import LabelRepo from '../../repositories/label';
import { labelIdSubpageIdSchema } from '../../models/urlParamsSchema';
import { labelUpdateSchema } from '../../models/labelModels';
import { handleOkResp } from '../common/handleResponse';
import log from '../common/log';
import { userHasNotPermissionError } from '../../models';

export const update = async (req: Request, res: Response) => {
  try {
    const params = labelIdSubpageIdSchema.parse(req.params);
    const data = labelUpdateSchema.parse(req.body);
    const userId = req.session.user?.id;
    if (!userId) {
      throw userHasNotPermissionError;
    }
    const response = await LabelRepo.update(data, params, userId);
    return response.isOk
      ? handleOkResp(201, response.value, res, `Updated label with id: ${params.labelId}`)
      : handleErrors(response.error, res);
  } catch (e) {
    return handleErrors(e as Error, res);
  } finally {
    log(req, res);
  }
};

export default update;
