import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import './LogInPage.css';
import { Link } from 'react-router-dom';

const schema = z.object({
  username: z.string().nonempty({ message: 'Username is required' }),
  password: z.string().nonempty({ message: 'Password is required' }),
});

function LogInPage() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="login">
      <header className="login__header">
        <img src="/assets/icons/nushn-logo.svg" alt="Nushn icon" className="icon" />
        <h1 className='header__title'>Welcome to Nushn</h1>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="login__form">
        <div className='validated-input'>
          <input
            type="text"
            placeholder="User"
            className={`form__input ${errors['username'] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
            {...register('username')}
          />
          {errors['username'] && <p className="text-red-500 text-xs">{errors['username'].message}</p>}
        </div>

        <div className='validated-input'>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className={`form__input ${errors['password'] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
            {...register('password')}
          />
          {errors['password'] && <p className="text-red-500 text-xs">{errors['password'].message}</p>}
        </div>
        <label className="show-password">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="shadow"
          />
          <span className="ml-2 text-sm">Show password</span>
        </label>
        <button type="submit">Log In</button>

        <p className="form__register">Don't have an account? <Link to={'/register'} className="register__link">Sign up.</Link></p>
      </form>
    </div>
  );
}

export default LogInPage;
