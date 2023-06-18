import type { Request, Response } from 'express';
import handleErrors from '../../common/handleErrors';
import { roleCreateSchema, userIdSubpageIdSchema } from '../../../models';
import SubpageRepos from '../../../repositories/subpage';
import { handleErrResp, handleOkResp } from '../../common';

// result code should be 201

// validation schema == { userIdSubpageIdSchema, roleCreateSchema }
// res.body type == RoleType

// function
const update = async (req: Request, res: Response) => {
  try {
    const params = userIdSubpageIdSchema.parse(req.params);
    const data = roleCreateSchema.parse(req.body);
    const response = await SubpageRepos.RoleRepo.update(data, params);
    return response.isOk
      ? handleOkResp(200, response.value, res, `Updated role for user with id: ${params.userId}.`)
      : handleErrResp(500, response.error, res, response.error.message);
  } catch (e) {
    return handleErrors(e, res);
  }
};

export default update;
