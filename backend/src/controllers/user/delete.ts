import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import { functionalityNotImplemented } from '../common/notimplemented';
import { userIdSchema } from '../../models/urlParamsSchema';
import UserRepos from '../../repositories/user';
import { handleErrResp, handleOkResp } from '../common/handleResponse';

// result code should be 204

// res.body type
// {}

// function
const deleteUser = async (req: Request, res: Response) => {
  try {
    const params = userIdSchema.parse(req.params);
    const response = await UserRepos.deleteUser(params);
    return response.isOk
      ? handleOkResp(204, response.value, res, `Deleted user with id: ${params.userId}.`)
      : handleErrResp(500, response.error, res, response.error.message);

    return await functionalityNotImplemented(req, res);
  } catch (e) {
    return handleErrors(e, res);
  }
};

export default deleteUser;
