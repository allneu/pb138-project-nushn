import { Link, useLocation } from 'react-router-dom';

import './Footer.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import projectIcons from '../../../public/assets/icons/projectIcons.json';

type FooterProps = {
  toggleMenu: () => void;
};

function Footer({
  toggleMenu,
}: FooterProps) {
  const location = useLocation();
  const subpageId = location.pathname.split('/')[3] || null;

  return (
    <footer className='footer'>
        <div className="footer__nav-icons lg:hidden">
            <FontAwesomeIcon className='icon' icon={projectIcons.menu.split(' ') as IconProp} onClick={toggleMenu}/>
            <Link to={`subpage/${subpageId}/task/newTask`}>
              <FontAwesomeIcon className='icon' icon={projectIcons['add-new'].split(' ') as IconProp} />
            </Link>
            <Link to={`${location.pathname}/editUser`}>
              <FontAwesomeIcon className='icon' icon={projectIcons.user.split(' ') as IconProp} />
            </Link>
        </div>
    </footer>
  );
}

export default Footer;
