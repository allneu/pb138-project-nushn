import type { Request, Response } from 'express';
import handleErrors from '../../common/handleErrors';
import { userIdSubpageIdSchemaRole } from '../../../models';
import SubpageRepos from '../../../repositories/subpage';
import { handleErrResp, handleOkResp } from '../../common';
import log from '../../common/log';
// validation schema == userIdSubpageIdSchema

// res.body type == Deleted

// function
const deleteRole = async (req: Request, res: Response) => {
  try {
    const params = userIdSubpageIdSchemaRole.parse(req.params);
    const goodParams = { userId: params.userId, subpageId: params.subpageId };
    const response = await SubpageRepos.RoleRepo.delete(goodParams);
    return response.isOk
      ? handleOkResp(204, response.value, res, `Deleted role of user with id ${params.userId}.`)
      : handleErrResp(500, response.error, res, response.error.message);
  } catch (e) {
    return handleErrors(e, res);
  } finally {
    log(req, res);
  }
};

export default deleteRole;
