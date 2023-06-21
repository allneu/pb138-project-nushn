import { useState } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserType } from '../../../models';

import '../Dialog.css';
import projectIcons from '../../../../public/assets/icons/projectIcons.json';
import Notice from '../../Notice/Notice.tsx';
import useFetchUsers from '../../../hooks/useFetchUsers';

function ShareDialog() {
  const [open, setOpen] = useState(false);
  const [
    users,
    updateSearch,
    count,
    setCount,
   ] = useFetchUsers({ initialSearch: '', initialCount: 5 });

  const toggleDialog = () => {
    setOpen(!open);
  };

  const handleShare = () => {
    // TODO share with the user
    toggleDialog();
  };

  return (
    <>
      <div className={`bcg ${open ? '' : 'dialog--close'}`} onClick={toggleDialog}/>
      <div className='self-center'>
        <FontAwesomeIcon className='dialog-icon icon' icon={projectIcons.share.split(' ') as IconProp} onClick={toggleDialog}/>
        <div className='absolute z-1'>
          <dialog className={`dialog ${open ? '' : 'dialog--close'}`} open={open}>
            <input
              type="text"
              onChange={(event) => updateSearch(event.target.value)}
              placeholder="Search..."
            />
            <div className="users-wrapper">
              <div className="users">
                { users ? users?.data.map((user: UserType) => (
                  <div className='user' key={user.id} onClick={() => handleShare()}>
                      <FontAwesomeIcon className='dialog-icon icon'
                          icon={user.avatar?.split(' ') as IconProp}/>
                      <p>{user.username}</p>
                  </div>
                ))
                  : <Notice message={'No users found'} />
                }
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
