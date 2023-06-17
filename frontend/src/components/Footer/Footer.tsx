import { Link, useParams } from 'react-router-dom';

import './Footer.css';

type FooterProps = {
  showMenu: boolean;
  showNewTask: boolean;
  showUser: boolean;
  toggleMenu: () => void;
};

function Footer({
  showMenu, showNewTask, showUser, toggleMenu,
}: FooterProps) {
  const { subpageId } = useParams();
  return (
    <footer className='footer'>
        <div className="footer__last-edit">
            <span>Last edited x hours ago by @user</span>
        </div>
        <div className="footer__nav-icons lg:hidden">
            { showMenu
              ? <img className="icon" src="/assets/icons/menu.svg" onClick={toggleMenu} alt="Subpage menu icon"/>
              : <></>

            }
            { showNewTask
              ? <Link to={`/subpage/${subpageId}/task/newTask`}>
                    <img className='icon' src="/assets/icons/add.svg" alt="Add new task icon"/>
                  </Link>
              : <></>
            }
            { showUser
              ? <img className="icon" src="/assets/icons/account.svg" alt="User account icon"/>
              : <></>
            }
        </div>
    </footer>
  );
}

export default Footer;
