import { useState } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RoleCreateType, UserType } from '../../../models';

import '../Dialog.css';
import projectIcons from '../../../../public/assets/icons/projectIcons.json';
import Notice from '../../Notice/Notice.tsx';
import useFetchUsers from '../../../hooks/useFetchUsers';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';
import useShareSubpage from '../../../hooks/useShareSubpage.ts';

function ShareDialog() {
  const [open, setOpen] = useState(false);
  const { share } = useShareSubpage();
  const {
    users,
    hasMore,
    updateSearch,
    setCount,
  } = useFetchUsers({ initialSearch: '', initialCount: 2 });
  const loader = useInfiniteScroll({ setCount, hasMore });

  const toggleDialog = () => {
    setOpen(!open);
  };

  const handleShare = (userId: string) => {
    const newRole: RoleCreateType = {
      role: 'EDITOR',
      userId,
    };
    share(newRole);
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
              className="search-bar"
              type="text"
              onChange={(event) => updateSearch(event.target.value)}
              placeholder="Search..."
            />
            <div className="users-wrapper">
              <div className="users">
                { users ? users.map((user: UserType) => (
                  <div className='user' key={user.id} onClick={() => handleShare(user.id)}>
                      <FontAwesomeIcon className='dialog-icon icon'
                          icon={(user.avatar ? user.avatar?.split(' ') : projectIcons.user.split(' ')) as IconProp}/>
                      <p>{user.username}</p>
                  </div>
                ))
                  : <Notice message={'Cannot load users.'} />
                }
                <div id="load-more" ref={loader}>
                    {users ? users.length === 0 && <p>No matching users</p> : <></> }
                </div>
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
