import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

import './AuthPages.css';
import { Link } from 'react-router-dom';
import IconSelector from '../../components/IconSelector/IconSelector.tsx';
import icons from '../../../public/assets/icons/dialogIcons.json';
import projectIcons from '../../../public/assets/icons/projectIcons.json';
import { SignUpFormDataType, signUpFormSchema } from './AuthPagesSchema';
import useSignup from '../../hooks/useSignup';

function SignUpPage() {
  const [selectedIcon, setSelectedIcon] = useState(projectIcons.user);
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormDataType>({
    resolver: zodResolver(signUpFormSchema),
  });

  const { signup } = useSignup({ redirect: '/' });

  const onSubmit = (data: SignUpFormDataType) => {
    const newUser = {
      ...data,
      avatar: selectedIcon,
    };
    signup(newUser);
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
        <div className='flex flex-row gap-2 items-center py-2'>
          <div className='border border-gray-300 rounded-md p-1.5 self-center'>
            <IconSelector selectedIcon={selectedIcon}
                          setSelectedIcon={setSelectedIcon}
                          icons={icons.user}/>
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

export default SignUpPage;
