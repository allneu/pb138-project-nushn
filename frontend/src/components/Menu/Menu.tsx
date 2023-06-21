import {
  NavLink,
  Link,
  useParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import useAuth from '../../hooks/useAuth';
import { SubpagesApi } from '../../services/index';
import Notice from '../Notice/Notice.tsx';

import projectIcons from '../../../public/assets/icons/projectIcons.json';

import './Menu.css';
import {
  ResponseMulti,
  ResponseSingle,
  SubpageCreateResultType,
  SubpageCreateType,
  SubpageType,
} from '../../models';
import { addSingle } from '../../services/subpagesApi';

type MenuProps = {
  isOpen: boolean,
  toggleMenu: () => void,
};

function Menu({ isOpen, toggleMenu }: MenuProps) {
  const queryClient = useQueryClient();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();
  const subpageId = location.pathname.split('/')[3] || null;

  const { data: subpages, isLoading, isError } = useQuery({
    queryKey: ['menu'],
    queryFn: () => SubpagesApi.getAll(auth!.data.id),
    enabled: !!auth,
  });

  const newSubpageFC = (data: SubpageCreateType) => addSingle(auth?.data.id || '', data);

  const { mutateAsync: mutate } = useMutation({
    mutationFn: newSubpageFC,
    onSuccess: (newSubpageResponse: ResponseSingle<SubpageCreateResultType>) => {
      queryClient.setQueryData<ResponseMulti<SubpageType>>(
        ['menu'],
        (oldData) => (oldData ? {
          ...oldData,
          data: [...oldData.data, newSubpageResponse.data],
        }
          : undefined),
      );
      navigate(`subpage/${newSubpageResponse.data.id}`);
      toggleMenu();
    },
  });

  function handleAddNewSubpage() {
    const newSubpage: SubpageCreateType = {
      name: 'Untitled',
      description: '',
      icon: projectIcons['subpage-default'],
    };
    mutate(newSubpage);
  }

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
            <FontAwesomeIcon className='icon' icon={(auth.data.avatar ? auth.data.avatar.split(' ') : projectIcons.user.split(' ')) as IconProp} />
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

        <div className="menu__subpage border-gray-200 shadow-md" onClick={handleAddNewSubpage}>
            <FontAwesomeIcon className='icon' icon={projectIcons['add-new'].split(' ') as IconProp} />
            <span className="name">New subpage</span>
        </div>
    </nav>
  );
}

export default Menu;
