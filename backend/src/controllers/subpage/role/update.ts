import type { Request, Response } from 'express';
import handleErrors from '../../common/handleErrors';
import { roleUpdateSchema, userIdSubpageIdSchemaRole } from '../../../models';
import SubpageRepos from '../../../repositories/subpage';
import { handleErrResp, handleOkResp } from '../../common';
import log from '../../common/log';

// result code should be 201

// validation schema == { userIdSubpageIdSchema, roleCreateSchema }
// res.body type == RoleType

// function
const update = async (req: Request, res: Response) => {
  try {
    const params = userIdSubpageIdSchemaRole.parse(req.params);
    const goodParams = { userId: params.userId, subpageId: params.subpageId };
    const data = roleUpdateSchema.parse(req.body);
    const response = await SubpageRepos.RoleRepo.update(data, goodParams);
    return response.isOk
      ? handleOkResp(200, response.value, res, `Updated role for user with id: ${params.userId}.`)
      : handleErrResp(500, response.error, res, response.error.message);
  } catch (e) {
    return handleErrors(e, res);
  } finally {
    log(req, res);
  }
};

export default update;
