import { useState } from 'react';
import { useParams } from 'react-router-dom';

import ActionBar from '../../components/ActionBar/ActionBar.tsx';
import BoardView from '../../components/BoardView/BoardView.tsx';
import ListView from '../../components/ListView/ListView.tsx';
import Footer from '../../components/Footer/Footer.tsx';

import './Subpage.css';

// TODO - load the subpage from backend by its ID
import subpages from '../../../public/subpages.json';

type SubpageProps = {
  toggleMenu: () => void;
};

function Subpage({ toggleMenu }: SubpageProps): JSX.Element {
  const { subpageId } = useParams();

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

          <Footer showMenu={true} showNewTask={true} showUser={true} toggleMenu={toggleMenu}/>
        </div>
    </div>
  );
}

export default Subpage;
