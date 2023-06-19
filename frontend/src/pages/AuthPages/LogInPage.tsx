import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import './AuthPages.css';
import { Link, useNavigate } from 'react-router-dom';

import { logInFormSchema, LogInFormDataType } from './AuthPagesSchema';

function LogInPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LogInFormDataType>({
    resolver: zodResolver(logInFormSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data: LogInFormDataType) => {
    navigate('/');
    console.log(data);
  };

  return (
    <div className="login">
      <div className="logo__section">
        <img src="/assets/icons/nushn-logo.svg" alt="Nushn icon" className="icon" />
        <h1 className='logo__title'>Nushn</h1>
      </div>

      <header className="login__header">
        <h1 className='header__title'>Log in</h1>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="login__form">
        <div className='validated-input'>
          <input
            type="text"
            placeholder="email"
            className={`form__input ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
            {...register('email')}
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>

        <div className='validated-input'>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="password"
            className={`form__input ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
            {...register('password')}
          />
          {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
        </div>
        <label className="show-password">
          <input
            type="checkbox"
            className='h-8'
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <span className="ml-2 text-sm text-gray-500">Show password</span>
        </label>
        <button type="submit">Log In</button>

        <p className="form__to-register">Don't have an account? <Link to={'/signup'} className="to-register__link">Sign up.</Link></p>
      </form>
    </div>
  );
}

export default LogInPage;
