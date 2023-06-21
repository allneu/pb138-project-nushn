import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import { userIdSubpageIdSchema } from '../../models';
import SubpageRepos from '../../repositories/subpage';
import { handleErrResp, handleOkResp } from '../common';
import log from '../common/log';

// validation schema = userIdSubpageIdSchema

// res.body type = Deleted

// function
const deleteSubpage = async (req: Request, res: Response) => {
  try {
    const params = userIdSubpageIdSchema.parse(req.params);
    const response = await SubpageRepos.delete(params);
    return response.isOk
      ? handleOkResp(204, response.value, res, `Deleted subpage with id: ${params.subpageId}.`)
      : handleErrResp(500, response.error, res, response.error.message);
  } catch (e) {
    return handleErrors(e, res);
  } finally {
    log(req, res);
  }
};

export default deleteSubpage;
