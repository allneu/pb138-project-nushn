import { useState } from 'react';
import ActionBar from '../../components/ActionBar/ActionBar.tsx';
import BoardView from '../../components/BoardView/BoardView.tsx';
import ListView from '../../components/ListView/ListView.tsx';

import './Subpage.css';

type SubpageProps = {
  toggleMenu: () => void;
};

function Subpage({ toggleMenu }: SubpageProps) {
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
        <div className="subpage__header">
            <img src="../../assets/icons/check-todo.svg" alt="Subpage image"/>
            <h1>Subpage #1</h1>
        </div>

        <ActionBar onViewChange={handleViewChange}/>

        <div className="subpage__tasks-view">{viewComponent}</div>

        <div className='subpage__footer'>
          <div className="footer__last-edit">
              <p>Last edited x hours ago by @user</p>
          </div>

          <div className="footer__nav-icons">
              <img src="../../assets/icons/menu.svg" onClick={toggleMenu} alt="Subpage menu icon"/>
              <img src="../../assets/icons/add.svg" alt="Add new task icon"/>
              <img src="./../assets/icons/account.svg" alt="User account icon"/>
          </div>
        </div>

      </div>
  );
}

export default Subpage;
