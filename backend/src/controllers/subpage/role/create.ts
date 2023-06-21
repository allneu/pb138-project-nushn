import type { Request, Response } from 'express';
import handleErrors from '../../common/handleErrors';
import { roleCreateSchema } from '../../../models/roleModels';
import { userIdSubpageIdSchemaRole } from '../../../models';
import SubpageRepos from '../../../repositories/subpage';
import { handleOkResp } from '../../common';
import log from '../../common/log';

const create = async (req: Request, res: Response) => {
  try {
    const data = roleCreateSchema.parse(req.body);
    const params = userIdSubpageIdSchemaRole.parse(req.params);
    const goodParams = { userId: params.userId, subpageId: params.subpageId };
    const response = await SubpageRepos.RoleRepo.create(data, goodParams);
    return response.isOk
      ? handleOkResp(201, response.value, res, `Created new role for user with id: ${params.userId}`)
      : handleErrors(response.error, res);
  } catch (e) {
    return handleErrors(e as Error, res);
  } finally {
    log(req, res);
  }
};

export default create;
