import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import { userIdSchema } from '../../models/urlParamsSchema';
import { userUpdateSchema } from '../../models/userModels';
import UserRepos from '../../repositories/user';
import { handleOkResp } from '../common/handleResponse';
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
      : handleErrors(response.error, res);
  } catch (e) {
    return handleErrors(e as Error, res);
  } finally {
    log(req, res);
  }
};

export default update;
