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

  let viewComponent;

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
      <div className='subpage'>
        <Menu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
        <div className="subpage__header">
            <img src={subpage?.icon} alt="Subpage image"/>
            <h1>{subpage?.name}</h1>
        </div>

        <ActionBar onViewChange={handleViewChange}/>

        <div className="subpage__tasks-view">{viewComponent}</div>

        <div className='subpage__footer'>
          <div className="footer__last-edit">
              <p>Last edited x hours ago by @user</p>
          </div>

          <div className="footer__nav-icons">
              <img src="/assets/icons/menu.svg" onClick={toggleMenu} alt="Subpage menu icon"/>
              <img src="/assets/icons/add.svg" alt="Add new task icon"/>
              <img src="/assets/icons/account.svg" alt="User account icon"/>
          </div>
        </div>

      </div>
  );
}

export default Subpage;
