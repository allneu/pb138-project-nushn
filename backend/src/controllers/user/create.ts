import type { Request, Response } from 'express';
import { z } from 'zod';
import handleErrors from '../common/handleErrors';
import { functionalityNotImplemented } from '../common/notimplemented';

// result code should be 201

// validation schema
const passwordSchema = z.string().refine((password) => {
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasMinLength = password.length >= 6;

  return hasLowerCase && hasUpperCase && hasNumber && hasMinLength;
}, 'Password must contain at least 6 characters, one uppercase letter, one lowercase letter and one number');

const bodySchema = z.object({
  username: z.string().nonempty('Username can not be empty').min(3, 'Username must be at least 3 characters long'),
  email: z.string().email('Invalid email address').nonempty('Email can not be empty'),
  password: passwordSchema,
}).strict();

// res.body type
export interface ResultBody {
  id: string,
  username: string,
  email: string,
}

// function
export const create = async (req: Request, res: Response) => {
  try {
    bodySchema.parse(req.body);
    return await functionalityNotImplemented(req, res);
  } catch (e) {
    return handleErrors(e, res);
  }
};
