import { useParams, Link } from 'react-router-dom';
import { SubpageType } from '../../models';

import './Menu.css';

// TODO - GET subpages from backend
import subpages from '../../../public/subpages.json';

type MenuProps = {
  isOpen: boolean;
  toggleMenu: () => void;
};

function Menu({ isOpen, toggleMenu }: MenuProps) {
  const { subpageId } = useParams();
  return (
        <div className={`menu ${isOpen ? '' : 'hidden'}`}>
            <div className="menu__header">
                <img src="/assets/icons/nushn-logo.png" alt="Nushn logo"/>
                <h1>Nushn</h1>
                <img src="/assets/icons/cross.svg" onClick={toggleMenu} alt="Hide menu icon"/>
            </div>

            <div className="menu__subpages">
                {subpages.map((subpage: SubpageType) => (
                    <Link to={`/subpage/${subpage.id}`} className={`menu__subpage ${subpage.id === subpageId ? 'current' : ''}`}
                        key={subpage.id} onClick={toggleMenu}>
                        <img src={subpage.icon} alt="Subpage icon"/>
                        <h2>{subpage.name}</h2>
                        <img src="/assets/icons/right-arrow.svg" alt="Subpage icon"/>
                    </Link>
                ))}
            </div>

            <Link to="/new-subpage" className="menu__subpage new" onClick={toggleMenu}>
                <img src="/assets/icons/add.svg" alt="Add new subpage icon"/>
                <h2>New subpage</h2>
            </Link>
        </div>
  );
}

export default Menu;
