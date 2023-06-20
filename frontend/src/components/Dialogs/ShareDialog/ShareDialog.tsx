import { ReactNode, useState } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';

import { UsersApi } from '../../../services';
import { UserType } from '../../../models';
import useAuth from '../../../hooks/useAuth';

import '../Dialog.css';
import projectIcons from '../../../../public/assets/icons/projectIcons.json';
import Notice from '../../Notice/Notice.tsx';

function ShareDialog() {
  const [open, setOpen] = useState(false);
  const { auth } = useAuth();
  const [errNotice, setErrNotice] = useState<ReactNode>(null);

  const { data: users, isLoading: isLoadingUsers, isError: isErrorUsers } = useQuery({
    queryKey: ['users'],
    queryFn: () => UsersApi.getAll(),
    enabled: !!auth,
  });

  const toggleDialog = () => {
    setOpen(!open);
  };

  const handleShare = () => {
    // TODO share with the user
    toggleDialog();
  };

  if (isErrorUsers) {
    setErrNotice(<Notice message={'An error occured while loading users.'} />);
  } else if (isLoadingUsers) {
    setErrNotice(<Notice message={'The subpage is loading ...'} />);
  } else {
    setErrNotice(null);
  }

  return (
    <>
    <div className={`bcg ${open ? '' : 'dialog--close'}`} onClick={toggleDialog}/>
    <div className='self-center'>
      <FontAwesomeIcon className='dialog-icon icon' icon={projectIcons.share.split(' ') as IconProp} onClick={toggleDialog}/>
      <div className='absolute z-1'>
        <dialog className={`dialog ${open ? '' : 'dialog--close'}`} open={open}>
          <div className="users-wrapper">
            <div className="users">
              { errNotice }
              {users?.data.map((user: UserType) => (
                <div className='user' key={user.id} onClick={() => handleShare()}>
                    <FontAwesomeIcon className='dialog-icon icon'
                        icon={user.avatar?.split(' ') as IconProp}/>
                    <p>{user.username}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="close-btn" onClick={toggleDialog}>Close</p>
        </dialog>
      </div>
    </div>
    </>
  );
}

export default ShareDialog;
