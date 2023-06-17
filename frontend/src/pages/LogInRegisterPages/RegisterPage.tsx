import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import './LogInRegisterPages.css';
import { Link } from 'react-router-dom';

const passwordSchema = z.string()
  .refine((value) => value.length >= 8, { message: 'Password must be at least 8 characters long' })
  .refine((value) => /[A-Z]/.test(value), { message: 'Password must contain at least one uppercase letter' })
  .refine((value) => /[a-z]/.test(value), { message: 'Password must contain at least one lowercase letter' })
  .refine((value) => /\d/.test(value), { message: 'Password must contain at least one digit' })
  .refine((value) => /\W/.test(value), { message: 'Password must contain at least one special character' });

const schema = z.object({
  username: z.string().nonempty({ message: 'Username is required' }),
  email: z.string().nonempty({ message: 'Email required' }).email({ message: 'Invalid email address' }),
  password: passwordSchema,
});

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="register">
      <header className="register__header">
        <img src="/assets/icons/nushn-logo.svg" alt="Nushn icon" className="icon" />
        <h1 className='header__title'>Welcome to Nushn</h1>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="register__form">
        <div className='validated-input'>
          <input
            type="text"
            placeholder="Username"
            className={`form__input ${errors['username'] ? 'border-red-500' : 'border-gray-300'}`}
            {...register('username')}
          />
          {errors['username'] && <p className="text-red-500 text-xs">{errors['username'].message}</p>}
        </div>

        <div className='validated-input'>
          <input
            type="text"
            placeholder="Email"
            className={`form__input ${errors['email'] ? 'border-red-500' : 'border-gray-300'}`}
            {...register('email')}
          />
          {errors['email'] && <p className="text-red-500 text-xs">{errors['email'].message}</p>}
        </div>

        <div className='validated-input'>
          <input
            type="text"
            placeholder="Password"
            className={`form__input ${errors['password'] ? 'border-red-500' : 'border-gray-300'}`}
            {...register('password')}
          />
          {errors['password'] && <p className="text-red-500 text-xs">{errors['password'].message}</p>}
        </div>

        <button type="submit">Register</button>

        <p className="form__to-login">Already have an account? <Link to={'/login'} className="to-login__link">Log in.</Link></p>
      </form>
    </div>
  );
}

export default RegisterPage;
