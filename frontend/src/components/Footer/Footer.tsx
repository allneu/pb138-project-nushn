import { Link, useParams } from 'react-router-dom';

import './Footer.css';
import icons from '../../../public/assets/icons/projectIcons.json';

type FooterProps = {
  toggleMenu: () => void;
};

function Footer({
  toggleMenu,
}: FooterProps) {
  const { subpageId } = useParams();
  return (
    <footer className='footer'>
        <div className="footer__nav-icons lg:hidden">
            <i className={icons.menu} onClick={toggleMenu} />
            <Link to={`/subpage/${subpageId}/task/newTask`}>
                <i className={icons['add-new']} />
            </Link>
            <i className={icons.user} />
        </div>
    </footer>
  );
}

export default Footer;
