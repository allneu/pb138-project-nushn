import { useParams, Link, useLocation } from 'react-router-dom';
import { SubpageType } from '../../models';

import './Menu.css';
import icons from '../../../public/assets/icons/projectIcons.json';

// TODO - GET subpages from backend
import subpages from '../../../public/subpages.json';

type MenuProps = {
  isOpen: boolean,
  toggleMenu: () => void,
};

// TODO - delete after when you have the user data from backend
const user = {
  avatar: icons.user,
  userName: 'User 1',
};

function Menu({ isOpen, toggleMenu }: MenuProps) {
  const { userId } = useParams();

  const location = useLocation();
  const subpageId = location.pathname.split('/')[4] || null;

  return (
        <nav className={`menu ${isOpen ? 'menu--show' : 'menu--hide'}`}>
            <div className="menu-header">
                <div className="logo">
                    <img className="logo__icon" src="/assets/icons/nushn-logo.svg" alt="Nushn logo"/>
                    <span className="logo__text">Nushn</span>
                </div>
            </div>

            <Link to={`/user/${userId}/subpage/${subpageId}/editUser`} className="menu__user"
                        onClick={toggleMenu}>
                    <i className={user.avatar} />
                    <span className="subpage-name">{user.userName}</span>
            </Link>

            <div className="menu__subpages">
                {subpages.map((subpage: SubpageType) => (
                    <Link to={`/user/${userId}/subpage/${subpage.id}`} className={`menu__subpage ${subpage.id === subpageId ? 'current' : ''}`}
                        key={subpage.id} onClick={toggleMenu}>
                        <i className={subpage.icon} />
                        <span className="subpage-name">{subpage.name}</span>
                        {/* TODO - show only when subpage is shared */}
                        <i className={`grey ${icons.shared}`}/>
                    </Link>
                ))}
            </div>

            <Link to={`/user/${userId}/new-subpage`} className="menu__subpage border-gray-200 shadow-md" onClick={toggleMenu}>
                <i className={icons['add-new']} />
                <span className="subpage-name">New subpage</span>
            </Link>
        </nav>
  );
}

export default Menu;
