import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

import './AuthPages.css';
import { Link, useNavigate } from 'react-router-dom';
import IconSelector from '../../components/IconSelector/IconSelector.tsx';
import icons from '../../../public/assets/icons/dialogIcons.json';

const passwordSchema = z.string()
  .refine((value) => value.length >= 8, { message: 'Password must be at least 8 characters long' })
  .refine((value) => /[A-Z]/.test(value), { message: 'Password must contain at least one uppercase letter' })
  .refine((value) => /[a-z]/.test(value), { message: 'Password must contain at least one lowercase letter' })
  .refine((value) => /\d/.test(value), { message: 'Password must contain at least one digit' })
  .refine((value) => /\W/.test(value), { message: 'Password must contain at least one special character' });

const signUpFormSchema = z.object({
  username: z.string().nonempty({ message: 'Username is required' }),
  email: z.string().nonempty({ message: 'Email required' }).email({ message: 'Invalid email address' }),
  password: passwordSchema,
});

export type SignUpFormDataType = z.infer<typeof signUpFormSchema>;

function RegisterPage() {
  const [selectedIcon, setSelectedIcon] = useState('user secret icon');
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormDataType>({
    resolver: zodResolver(signUpFormSchema),
  });

  const onSubmit = (data: SignUpFormDataType) => {
    navigate('/');
    console.log(data);
  };

  return (
    <div className="register">
      <div className="logo__section">
        <img src="/assets/icons/nushn-logo.svg" alt="Nushn icon" className="icon" />
        <h1 className='logo__title'>Nushn</h1>
      </div>

      <header className="login__header">
        <h1 className='header__title'>Sign up</h1>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="register__form">
        <div className='validated-input flex flex-row gap-3 items-center'>
          <div className='border border-gray-300 rounded-md p-2 self-center'>
            <IconSelector selectedIcon={selectedIcon}
                setSelectedIcon={setSelectedIcon} icons={icons.user}/>
          </div>
          <div className='flex-grow'>
            <input
              type="text"
              placeholder="@username"
              className={`form__input ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
              {...register('username')}
            />
            {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
          </div>
        </div>

        <div className='validated-input'>
          <input
            type="text"
            placeholder="email"
            className={`form__input ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            {...register('email')}
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>

        <div className='validated-input'>
          <input
            type="password"
            placeholder="password"
            className={`form__input ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            {...register('password')}
          />
          {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
        </div>

        <button type="submit">Sign up</button>

        <p className="form__to-login">Already have an account? <Link to={'/login'} className="to-login__link">Log in.</Link></p>
      </form>
    </div>
  );
}

export default RegisterPage;
