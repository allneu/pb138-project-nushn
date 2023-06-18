import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import { subpageUpdateSchema, userIdSubpageIdSchema } from '../../models';
import SubpageRepos from '../../repositories/subpage';
import { handleErrResp, handleOkResp } from '../common';

// validation schema == { userIdSubpageIdSchema, subpageUpdateSchema}

// res.body type == SubpageUpdateResult

// function
const update = async (req: Request, res: Response) => {
  try {
    const params = userIdSubpageIdSchema.parse(req.params);
    const data = subpageUpdateSchema.parse(req.body);
    const response = await SubpageRepos.update(data, params);
    return response.isOk
      ? handleOkResp(200, response.value, res, `Updated subpage with id: ${params.subpageId}.`)
      : handleErrResp(500, response.error, res, response.error.message);
  } catch (e) {
    return handleErrors(e, res);
  }
};

export default update;
