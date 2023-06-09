import ActionBar from '../components/ActionBar';
import BoardView from '../components/BoardView/BoardView';

function Subpage() {
    return (
      <div className='subpage'>
        <div className="subpage__header">
          {/* TODO */}
            <img src="../../assets/icons/done.svg" alt="Subpage icon"/>
            <h1>Subpage #1</h1>
        </div>

        <ActionBar />

        <BoardView />
        {/*
            Bullet list view
            Check list view
         */}
        
        <div className="subpage__last-edit">
            <p>Last edited x hours ago by @user</p>
        </div>

        <div className="subpage__footer">
            <img src="../../assets/icons/menu.svg" alt="Subpage menu icon"/>
            <img src="../../assets/icons/add.svg" alt="Add new task icon"/>
            <img src="./../assets/icons/account.svg" alt="User account icon"/>
        </div>

      </div>
    );
  }
  
  export default Subpage;
  