import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { userFormSchema, UserFormDataType } from './UserSchema';
import projectIcons from '../../../../public/assets/icons/projectIcons.json';
import dialogIcons from '../../../../public/assets/icons/dialogIcons.json';

import '../Views.css';
import IconSelector from '../../../components/IconSelector/IconSelector.tsx';
import ChangePassword from '../../../components/ChangePassword/ChangePassword.tsx';

const user = {
  avatar: 'secret user icon',
  userName: 'user1',
  email: 'user1@email.com',
  password: 'something',
};

function UserView() {
  const { userId, subpageId } = useParams();
  const [formData, setFormData] = useState(user);
  const [selectedIcon, setSelectedIcon] = useState(user.avatar);
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormDataType>({
    defaultValues: formData,
    resolver: zodResolver(userFormSchema),
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (data: UserFormDataType) => {
    console.log(data);
    navigate(`/user/${userId}/subpage/${subpageId}`);
  };

  const handleChangePassword = () => {
    setChangePasswordMode(true);
  };

  return (
    <div className='user-view'>
        <form className='flex-grow' onSubmit={handleSubmit(onSubmit)}>
            <nav className="user-view__nav">
                <Link to={`/user/${userId}/subpage/${subpageId}`}>
                    <i className={projectIcons['back-arrow']}/>
                </Link>
                <button type="submit">
                    <i className={projectIcons.submit}/>
                </button>
            </nav>

            <div className="user-view__form">
                <div className='flex flex-row gap-5 py-2 self-center'>
                    <IconSelector selectedIcon={selectedIcon}
                                setSelectedIcon={setSelectedIcon}
                                icons={dialogIcons.user} />
                    <div className="input-with-errors">
                        <input
                            className="form__input font-bold"
                            placeholder='@username'
                            value={formData.userName}
                            {...register('userName', { onChange })}
                        />
                        {errors.userName && <span className="validation-error">{errors.userName.message}</span>}
                    </div>
                </div>

                <div className="user-view__info">
                    <div className='detail'>
                        <div className="detail__label text-base">
                            <i className={`w-5 h-5 ${projectIcons.email}`} />
                            <span>Email</span>
                        </div>
                        <div className="input-with-errors">
                            <input type="email"
                                className="form__input"
                                {...register('email', { onChange })}
                            />
                            {errors.email && <span className="validation-error">{errors.email.message}</span>}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    <div className='change-pswd'>
        <div className='bg-gray-400 h-px w-full'></div>
        {changePasswordMode
          ? <ChangePassword onClose={() => setChangePasswordMode(false)} />
          : <button className="change-password-btn" onClick={handleChangePassword}>
                Change Password
            </button>
        }
    </div>
    </div>
  );
}

export default UserView;
