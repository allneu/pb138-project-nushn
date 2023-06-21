import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import { subpageUpdateSchema, userIdSubpageIdSchema } from '../../models';
import SubpageRepos from '../../repositories/subpage';
import { handleOkResp } from '../common';
import log from '../common/log';

const update = async (req: Request, res: Response) => {
  try {
    const params = userIdSubpageIdSchema.parse(req.params);
    const data = subpageUpdateSchema.parse(req.body);
    const response = await SubpageRepos.update(data, params);
    return response.isOk
      ? handleOkResp(200, response.value, res, `Updated subpage with id: ${params.subpageId}.`)
      : handleErrors(response.error, res);
  } catch (e) {
    return handleErrors(e as Error, res);
  } finally {
    log(req, res);
  }
};

export default update;
