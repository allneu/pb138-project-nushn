import { useState } from 'react';
import { useParams, Outlet } from 'react-router-dom';

import ViewType from './viewType';
import ActionBar from '../../components/ActionBar/ActionBar.tsx';
import BoardView from '../../components/BoardView/BoardView.tsx';
import ListView from '../../components/ListView/ListView.tsx';

import './Subpage.css';
import subpages from '../../../public/subpages.json';

function Subpage() {
  const { subpageId } = useParams();
  // TODO - load the subpage from backend by its ID
  const subpage = subpages.find((page) => page.id === subpageId);

  const [view, setView] = useState<ViewType>('board');
  const handleViewChange = (newView: ViewType) => {
    setView(newView);
  };

  let viewComponent: JSX.Element;
  if (view === 'board') {
    viewComponent = <BoardView />;
  } else if (view === 'checklist') {
    viewComponent = <ListView type="check" />;
  } else {
    viewComponent = <ListView type="bullet" />;
  }

  return (
    <>
        <div className="subpage">
            <header className="subpage-header">
                <div className="name-wrapper">
                    <i className={subpage?.icon}/>
                    <span className="name-wrapper__name">{subpage?.name}</span>
                </div>
                <span className="subpage-header__description">{subpage?.description}</span>
                <ActionBar onViewChange={handleViewChange}/>
            </header>

            <div className="subpage__separator"/>

            <main className="subpage__tasks">
                {viewComponent}
            </main>

            <footer className="subpage__last-edit">
              <span>Last edited x hours ago by @user</span>
            </footer>
        </div>

        <Outlet />
    </>
  );
}

export default Subpage;
