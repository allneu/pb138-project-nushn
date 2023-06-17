import { Link, useParams } from 'react-router-dom';

import './Footer.css';

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
            <img className="icon" src="/assets/icons/menu.svg" onClick={toggleMenu} alt="Subpage menu icon"/>
            <Link to={`/subpage/${subpageId}/task/newTask`}>
                <img className='icon' src="/assets/icons/add.svg" alt="Add new task icon"/>
            </Link>
            <img className="icon" src="/assets/icons/account.svg" alt="User account icon"/>
        </div>
    </footer>
  );
}

export default Footer;
