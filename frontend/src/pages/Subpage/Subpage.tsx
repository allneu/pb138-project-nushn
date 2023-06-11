import ActionBar from '../../components/ActionBar/ActionBar.tsx';
import BoardView from '../../components/BoardView/BoardView.tsx';

import './Subpage.css';

function Subpage() {
  return (
      <div className='subpage'>
        <div className="subpage__header">
          {/* TODO - change to the subpage image */}
            <img src="../../assets/icons/done.svg" alt="Subpage image"/>
            <h1>Subpage #1</h1>
        </div>

        <ActionBar />

        <div className="subpage__tasks-view">
          <BoardView/>
          {/*
              Bullet list view
              Check list view
          */}
        </div>

        <div className='subpage__footer'>
          <div className="footer__last-edit">
              <p>Last edited x hours ago by @user</p>
          </div>

          <div className="footer__nav-icons">
              <img src="../../assets/icons/menu.svg" alt="Subpage menu icon"/>
              <img src="../../assets/icons/add.svg" alt="Add new task icon"/>
              <img src="./../assets/icons/account.svg" alt="User account icon"/>
          </div>
        </div>

      </div>
  );
}

export default Subpage;
