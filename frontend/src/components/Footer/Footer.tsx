import { Link, useParams } from 'react-router-dom';

import './Footer.css';
import icons from '../../../public/assets/icons/projectIcons.json';

type FooterProps = {
  toggleMenu: () => void;
};

function Footer({
  toggleMenu,
}: FooterProps) {
  const { userId, subpageId } = useParams();
  return (
    <footer className='footer'>
        <div className="footer__nav-icons lg:hidden">
            <i className={icons.menu} onClick={toggleMenu} />
            <Link to={`/user/${userId}/subpage/${subpageId}/task/newTask`}>
                <i className={icons['add-new']} />
            </Link>
            <Link to={`/user/${userId}/subpage/${subpageId}/editUser`}>
              <i className={icons.user} />
            </Link>
        </div>
    </footer>
  );
}

export default Footer;
