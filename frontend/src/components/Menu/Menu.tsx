import { NavLink, Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import useAuth from '../../hooks/useAuth';
import { SubpagesApi } from '../../services/index';
import Notice from '../Notice/Notice.tsx';

import projectIcons from '../../../public/assets/icons/projectIcons.json';

import './Menu.css';

type MenuProps = {
  isOpen: boolean,
  toggleMenu: () => void,
};

function Menu({ isOpen, toggleMenu }: MenuProps) {
  const { subpageId } = useParams();

  const { auth } = useAuth();

  const { data: subpages, isLoading, isError } = useQuery({
    queryKey: ['menu'],
    queryFn: () => SubpagesApi.getAll(auth!.data.id),
    enabled: !!auth,
  });

  if (!auth || isError) return <Notice message={'An error occured while loading menu.'} />;
  if (isLoading) return <Notice message={'The menu is loading ...'} />;

  return (
    <nav className={`menu ${isOpen ? 'menu--show' : 'menu--hide'}`}>
        <div className="menu-header">
            <div className="logo">
                <img className="logo__icon" src="/assets/icons/nushn-logo.svg" alt="Nushn logo"/>
                <span className="logo__text">Nushn</span>
            </div>
        </div>

        <Link to={`subpage/${subpageId}/editUser`} className="menu__user" onClick={toggleMenu}>
            <FontAwesomeIcon className='icon' icon={(auth?.data.avatar ? auth.data.avatar.split(' ') : projectIcons.user) as IconProp} />
            <span className="name">{auth?.data.username}</span>
        </Link>

        <div className="menu__subpages">
            {subpages.data.map((subpage) => (
                <NavLink
                    to={`subpage/${subpage.id}`}
                    className={({ isActive }) => `subpage-item ${isActive ? 'text-opacity-70' : ''}`}
                    key={subpage.id}
                    onClick={toggleMenu}
                >
                    <FontAwesomeIcon className='icon' icon={subpage.icon.split(' ') as IconProp} />
                    <span className="name">{subpage.name}</span>
                    {/* TODO - show only when subpage is shared */}
                    <FontAwesomeIcon className='icon' icon={projectIcons.shared.split(' ') as IconProp} />
                </NavLink>
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
