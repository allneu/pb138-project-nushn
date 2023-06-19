import { useParams, Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { SubpageType } from '../../models';
import projectIcons from '../../../public/assets/icons/projectIcons.json';

import './Menu.css';

// TODO - GET subpages from backend
import subpages from '../../../public/subpages.json';

type MenuProps = {
  isOpen: boolean,
  toggleMenu: () => void,
};

// TODO - delete after when you have the user data from backend
const user = {
  avatar: projectIcons.user,
  userName: 'User 1',
};

function Menu({ isOpen, toggleMenu }: MenuProps) {

  const location = useLocation();
  const subpageId = location.pathname.split('/')[3] || null;

  return (
        <nav className={`menu ${isOpen ? 'menu--show' : 'menu--hide'}`}>
            <div className="menu-header">
                <div className="logo">
                    <img className="logo__icon" src="/assets/icons/nushn-logo.svg" alt="Nushn logo"/>
                    <span className="logo__text">Nushn</span>
                </div>
            </div>

            <Link to={ `subpage/${subpageId}/editUser`} className="menu__user"
                        onClick={toggleMenu}>
                    <FontAwesomeIcon className='icon' icon={user.avatar.split(' ') as IconProp} />
                    <span className="name">{user.userName}</span>
            </Link>

            <div className="menu__subpages">
                {subpages.map((subpage: SubpageType) => (
                    <Link to={`subpage/${subpage.id}`} className={`menu__subpage ${subpage.id === subpageId ? 'current' : ''}`}
                        key={subpage.id} onClick={toggleMenu}>
                        <FontAwesomeIcon className='icon' icon={subpage.icon.split(' ') as IconProp} />
                        <span className="name">{subpage.name}</span>
                        {/* TODO - show only when subpage is shared */}
                        <FontAwesomeIcon className='icon' icon={projectIcons.shared.split(' ') as IconProp} />
                    </Link>
                ))}
            </div>

            <Link to='/new-subpage' className="menu__subpage border-gray-200 shadow-md" onClick={toggleMenu}>
                <FontAwesomeIcon className='icon' icon={projectIcons['add-new'].split(' ') as IconProp} />
                <span className="name">New subpage</span>
            </Link>
        </nav>
  );
}

export default Menu;
