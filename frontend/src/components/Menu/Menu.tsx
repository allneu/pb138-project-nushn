import { useParams, Link } from 'react-router-dom';
import { SubpageType } from '../../models';

import './Menu.css';

// TODO - GET subpages from backend
import subpages from '../../../public/subpages.json';

type MenuProps = {
  isOpen: boolean,
  toggleMenu: () => void,
};

function Menu({ isOpen, toggleMenu }: MenuProps) {
  const { subpageId } = useParams();
  return (
        <nav className={`menu ${isOpen ? 'menu--show' : 'menu--hide'}`}>
            <div className="menu-header">
                <div className="logo">
                    <img className="logo__icon" src="/assets/icons/nushn-logo.svg" alt="Nushn logo"/>
                    <span className="logo__text">Nushn</span>
                </div>
            </div>

            <div className="menu__subpages">
                {subpages.map((subpage: SubpageType) => (
                    <Link to={`/subpage/${subpage.id}`} className={`menu__subpage ${subpage.id === subpageId ? 'current' : ''}`}
                        key={subpage.id} onClick={toggleMenu}>
                        <img className="icon" src={subpage.icon} alt="Subpage icon"/>
                        <span className="subpage-name">{subpage.name}</span>
                        <img className="icon" src="/assets/icons/right-arrow.svg" alt="Subpage icon"/>
                    </Link>
                ))}
            </div>

            <Link to="/new-subpage" className="menu__subpage border-gray-200" onClick={toggleMenu}>
                <img className="icon" src="/assets/icons/add.svg" alt="Add new subpage icon"/>
                <span className="subpage-name">New subpage</span>
            </Link>
        </nav>
  );
}

export default Menu;
