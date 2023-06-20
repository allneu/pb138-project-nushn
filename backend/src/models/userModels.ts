import { z } from 'zod';

const passwordSchema = z.string().refine((password) => {
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasMinLength = password.length >= 6;

  return hasLowerCase && hasUpperCase && hasNumber && hasMinLength;
}, 'Password must contain at least 6 characters, one uppercase letter, one lowercase letter and one number');

export const userCreateSchema = z.object({
  username: z.string().nonempty('Username can not be empty').min(3, 'Username must be at least 3 characters long'),
  email: z.string().email('Invalid email address').nonempty('Email can not be empty'),
  password: passwordSchema,
  avatar: z.string().optional(),
}).strict();

export type UserCreateType = z.infer<typeof userCreateSchema>;

export type UserCreateResult = {
  id: string,
  username: string,
  email: string,
};

export const userDeleteSchema = z.object({
  userId: z.string().uuid(),
}).strict();

export type UserDeleteType = z.infer<typeof userDeleteSchema>;

export const userGetSpecificSchema = z.object({
  userId: z.string().uuid(),
}).strict();

export type UserGetSpecificType = z.infer<typeof userGetSpecificSchema>;

export type UserGetSpecificResult = {
  id: string,
  username: string,
  email: string,
  avatar: string,
};

export type UserGetMultipleResultBody = UserGetSpecificResult[];

export const userUpdateSchema = z.object({
  username: z.string().nonempty('Username can not be empty').min(3, 'Username must be at least 3 characters long').optional(),
  email: z.string().email('Invalid email address').nonempty('Email can not be empty').optional(),
  password: passwordSchema.optional(),
  avatar: z.string().optional(),
}).strict()
  .refine(
    (data) => (
      data.username !== undefined || data.email !== undefined || data.password !== undefined
    ),
    'At least one of username, email, or password must be provided.',
  );

export type UserUpdateType = z.infer<typeof userUpdateSchema>;

export type UserUpdateResult = {
  id: string,
  username: string | null,
  email: string | null,
  avatar: string | null,
};

export const userGetMultipleSchema = z.object({
  username: z.string(),
  count: z.number().positive(),
}).strict();

export type UserGetMultipleType = z.infer<typeof userGetMultipleSchema>;

export const userLoginSchema = z.object({
  email: z.any(),
  password: z.any(),
});

export type UserLoginType = z.infer<typeof userLoginSchema>;
