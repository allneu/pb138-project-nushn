import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import { userIdSchema } from '../../models/urlParamsSchema';
import UserRepos from '../../repositories/user';
import { handleOkResp } from '../common/handleResponse';
import log from '../common/log';

const deleteUser = async (req: Request, res: Response) => {
  try {
    const params = userIdSchema.parse(req.params);
    const response = await UserRepos.delete(params);
    return response.isOk
      ? handleOkResp(204, response.value, res, `Deleted user with id: ${params.userId}.`)
      : handleErrors(response.error, res);
  } catch (e) {
    return handleErrors(e as Error, res);
  } finally {
    log(req, res);
  }
};

export default deleteUser;
