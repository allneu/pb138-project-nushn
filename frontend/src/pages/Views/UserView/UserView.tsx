import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { userFormSchema, UserFormDataType } from './UserSchema';
import projectIcons from '../../../../public/assets/icons/projectIcons.json';
import dialogIcons from '../../../../public/assets/icons/dialogIcons.json';

import '../Views.css';
import IconSelector from '../../../components/Dialogs/IconSelector/IconSelector.tsx';
import ChangePassword from '../../../components/ChangePassword/ChangePassword.tsx';
import useAuth from '../../../hooks/useAuth.ts';
import UseDeleteUser from '../../../hooks/delete/useDeleteUser';
import useLogout from '../../../hooks/useLogout.ts';

const user = {
  avatar: projectIcons.user,
  userName: 'user1',
  email: 'user1@email.com',
  password: 'something',
};

function UserView() {
  const { subpageId } = useParams();
  const { auth } = useAuth();
  const userId = auth?.data.id;
  const [formData, setFormData] = useState(user);
  const [selectedIcon, setSelectedIcon] = useState(user.avatar);
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const navigate = useNavigate();
  const { deleteUser } = UseDeleteUser();
  const { logout } = useLogout();

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

  const handleDeleteAccount = () => {
    deleteUser();
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className='user-view'>
        <form className='flex-grow' onSubmit={handleSubmit(onSubmit)}>
            <nav className="user-view__nav">
                <Link to={subpageId ? `/auth/subpage/${subpageId}` : '/auth'}>
                    <FontAwesomeIcon className='icon' icon={projectIcons['back-arrow'].split(' ') as IconProp} />
                </Link>
                <button type="submit">
                    <FontAwesomeIcon className='icon' icon={projectIcons.submit.split(' ') as IconProp} />
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
                        <div className="detail__label items-center">
                            <FontAwesomeIcon className='icon' icon={projectIcons.email.split(' ') as IconProp} />
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
    <div className='user-view__btns'>
        {changePasswordMode
          ? <ChangePassword onClose={() => setChangePasswordMode(false)} />
          : <button className="user-view__btn" onClick={handleChangePassword}>
                Change Password
            </button>
        }
      <button className="user-view__btn" onClick={handleDeleteAccount}>
        Delete account
      </button>
      <button className="user-view__btn" onClick={handleLogout}>
        Log out
      </button>
    </div>
    </div>
  );
}

export default UserView;
