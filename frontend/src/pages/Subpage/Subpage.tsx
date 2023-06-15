import { useState } from 'react';
import { useParams } from 'react-router-dom';

import ActionBar from '../../components/ActionBar/ActionBar.tsx';
import BoardView from '../../components/BoardView/BoardView.tsx';
import ListView from '../../components/ListView/ListView.tsx';

import './Subpage.css';

// TODO - load the subpage from backend by its ID
import subpages from '../../../public/subpages.json';

function Subpage() {
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
    <div className="subpage">
        <div className="subpage__header">
            <img src={subpage?.icon} alt="Subpage image"/>
            <h1>{subpage?.name}</h1>
        </div>

        <ActionBar onViewChange={handleViewChange}/>

        <div className="subpage__tasks-view">{viewComponent}</div>
        <div className="subpage__last-edit">
            <p>Last edited x hours ago by @user</p>
        </div>
    </div>
  );
}

export default Subpage;
