import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import { userIdSchema } from '../../models/urlParamsSchema';
import { userUpdateSchema } from '../../models/userModels';
import UserRepos from '../../repositories/user';
import { handleErrResp, handleOkResp } from '../common/handleResponse';
import log from '../common/log';

// result code should be 201

// function
export const update = async (req: Request, res: Response) => {
  try {
    const params = userIdSchema.parse(req.params);
    const data = userUpdateSchema.parse(req.body);
    const response = await UserRepos.update({ ...data, ...params });
    return response.isOk
      ? handleOkResp(200, response.value, res, `Updated user with id: ${params.userId}.`)
      : handleErrResp(500, response.error, res, response.error.message);
  } catch (e) {
    return handleErrors(e, res);
  } finally {
    log(req, res);
  }
};

export default update;
