import type { Request, Response } from 'express';
import handleErrors from '../../common/handleErrors';
import { roleCreateSchema } from '../../../models/roleModels';
import { userIdSubpageIdSchema } from '../../../models';
import SubpageRepos from '../../../repositories/subpage';
import { handleErrResp, handleOkResp } from '../../common';
import log from '../../common/log';

// result code should be 201

// validation schema == { roleCreateSchema, userIdSubpageIdSchema }

// res.body type == RoleType

// function
const create = async (req: Request, res: Response) => {
  try {
    const data = roleCreateSchema.parse(req.body);
    const params = userIdSubpageIdSchema.parse(req.params);
    const response = await SubpageRepos.RoleRepo.create(data, params);
    return response.isOk
      ? handleOkResp(201, response.value, res, `Created new role for user with id: ${params.userId}`)
      : handleErrResp(500, response.error, res, response.error.message);
  } catch (e) {
    return handleErrors(e, res);
  } finally {
    log(req, res);
  }
};

export default create;
