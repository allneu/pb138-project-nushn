import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import { subpageCreateSchema } from '../../models/subpageModels';
import { userIdSchema } from '../../models/urlParamsSchema';
import SubpageRepos from '../../repositories/subpage';
import { handleOkResp } from '../common';
import log from '../common/log';

const create = async (req: Request, res: Response) => {
  try {
    const data = subpageCreateSchema.parse(req.body);
    const params = userIdSchema.parse(req.params);
    const response = await SubpageRepos.create(data, params);
    return response.isOk
      ? handleOkResp(201, response.value, res, `Created subpage with id: ${response.value.id}`)
      : handleErrors(response.error, res);
  } catch (e) {
    return handleErrors(e as Error, res);
  } finally {
    log(req, res);
  }
};

export default create;
