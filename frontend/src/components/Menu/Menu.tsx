import { Link } from 'react-router-dom';
import { SubpageType } from '../../models';

import './Menu.css';

// TODO - GET subpages from backend
import subpages from '../../../public/subpages.json';

type MenuProps = {
  isOpen: boolean;
  toggleMenu: () => void;
};

function Menu({ isOpen, toggleMenu }: MenuProps) {
  return (
        <div className={`menu ${isOpen ? '' : 'hidden'}`}>
            <div className="menu__header">
                <img src="../../assets/icons/nushn-logo.png" alt="Nushn logo"/>
                <h1>Nushn</h1>
            </div>

            <div className="menu__subpages">
                {subpages.map((subpage: SubpageType) => (
                    <Link to={subpage.id} className="menu__subpage" key={subpage.id} onClick={toggleMenu}>
                        <img src={subpage.icon} alt="Subpage icon"/>
                        <h2>{subpage.name}</h2>
                    </Link>
                ))}
            </div>

            <Link to="/new-subpage" className="menu__subpage new" onClick={toggleMenu}>
                <img src="../../assets/icons/add.svg" alt="Add new subpage icon"/>
                <h2>New subpage</h2>
            </Link>
        </div>
  );
}

export default Menu;
