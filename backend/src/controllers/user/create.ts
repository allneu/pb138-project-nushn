import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import { userCreateSchema } from '../../models/userModels';
import UserRepos from '../../repositories/user';
import { handleErrResp, handleOkResp } from '../common/handleResponse';
import log from '../common/log';

// result code should be 201

// validation schema

// function
const create = async (req: Request, res: Response) => {
  try {
    const data = userCreateSchema.parse(req.body);
    const response = await UserRepos.create(data);
    const userId = response.unwrap();
    req.session.user = { id: userId.id };
    return response.isOk
      ? handleOkResp(201, response.value, res, `Created user with id: ${response.value.id}`)
      : handleErrResp(500, response.error, res, response.error.message);
  } catch (e) {
    return handleErrors(e, res);
  } finally {
    log(req, res);
  }
};

export default create;
