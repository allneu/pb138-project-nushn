import type { Request, Response } from 'express';
import { z } from 'zod';
import handleErrors from '../common/handleErrors';
import { functionalityNotImplemented } from '../common/notimplemented';

// result code should be 201

// validation schema
const paramsSchema = z.object({
  userId: z.string().uuid(),
}).strict();

const passwordSchema = z.string().refine((password) => {
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasMinLength = password.length >= 6;

  return hasLowerCase && hasUpperCase && hasNumber && hasMinLength;
}, 'Password must contain at least 6 characters, one uppercase letter, one lowercase letter and one number');

const bodySchema = z.object({
  username: z.string().nonempty('Username can not be empty').min(3, 'Username must be at least 3 characters long').optional(),
  email: z.string().email('Invalid email address').nonempty('Email can not be empty').optional(),
  password: passwordSchema.optional(),
}).strict()
  .refine(
    (data) => (
      data.username !== undefined || data.email !== undefined || data.password !== undefined
    ),
    'At least one of username, email, or password must be provided.',
  );

// res.body type
export interface ResultBody { // return only id and updated data
  id: string,
  username?: string,
  email?: string,
}

// function
export const update = async (req: Request, res: Response) => {
  try {
    paramsSchema.parse(req.params);
    bodySchema.parse(req.body);
    return await functionalityNotImplemented(req, res);
  } catch (e) {
    return handleErrors(e, res);
  }
};
