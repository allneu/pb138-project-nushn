import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import { userIdSubpageIdSchema } from '../../models';
import SubpageRepos from '../../repositories/subpage';
import { handleOkResp } from '../common';
import log from '../common/log';

const deleteSubpage = async (req: Request, res: Response) => {
  try {
    const params = userIdSubpageIdSchema.parse(req.params);
    const response = await SubpageRepos.delete(params);
    return response.isOk
      ? handleOkResp(200, response.value, res, `Deleted subpage with id: ${params.subpageId}.`)
      : handleErrors(response.error, res);
  } catch (e) {
    return handleErrors(e as Error, res);
  } finally {
    log(req, res);
  }
};

export default deleteSubpage;
