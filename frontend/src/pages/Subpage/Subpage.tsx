import { useState } from 'react';
import { useParams } from 'react-router-dom';

import ActionBar from '../../components/ActionBar/ActionBar.tsx';
import BoardView from '../../components/BoardView/BoardView.tsx';
import ListView from '../../components/ListView/ListView.tsx';

import './Subpage.css';

// TODO - load the subpage from backend by its ID
import subpages from '../../../public/subpages.json';
import Menu from '../../components/Menu/Menu.tsx';

function Subpage() {
  const { subpageId } = useParams();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // TODO - load the subpage from backend by its ID
  const subpage = subpages.find((page) => page.id === subpageId);

  // Initial view is 'checklist', other options are 'board' and 'bulletlist'
  const [view, setView] = useState('checklist');

  const handleViewChange = (newView: string) => {
    setView(newView);
  };

  let viewComponent: JSX.Element;

  if (view === 'board') {
    viewComponent = <BoardView />;
  } else if (view === 'bulletlist') {
    viewComponent = <ListView type="bullet" />;
  } else if (view === 'checklist') {
    viewComponent = <ListView type="check" />;
  } else {
    viewComponent = <></>;
  }

  return (
      <div className="flex h-screen">
        <Menu isOpen={isMenuOpen} toggleMenu={toggleMenu} />

        <div className="subpage">
          <header className="subpage-header">
              <div className="name-wrapper">
                  <img className="icon" src={subpage?.icon} alt="Subpage icon"/>
                  <span className="name-wrapper__name">{subpage?.name}</span>
              </div>

              <span className="subpage-header__description">{subpage?.description}</span>

              <ActionBar onViewChange={handleViewChange}/>
          </header>

          <div className="subpage__separator"/>

          <main className="subpage__tasks">
              {viewComponent}
          </main>

          <footer className='subpage-footer'>
              <div className="subpage-footer__last-edit">
                  <span>Last edited x hours ago by @user</span>
              </div>
              <div className="subpage-footer__nav-icons">
                  <img className="icon" src="/assets/icons/menu.svg" onClick={toggleMenu} alt="Subpage menu icon"/>
                  <img className="icon" src="/assets/icons/add.svg" alt="Add new task icon"/>
                  <img className="icon" src="/assets/icons/account.svg" alt="User account icon"/>
              </div>
          </footer>
      </div>
    </div>
  );
}

export default Subpage;
