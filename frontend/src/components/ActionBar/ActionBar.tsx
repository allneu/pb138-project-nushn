import './ActionBar.css';

function ActionBar() {
  return (
    <div className="action-bar">
        <img src="../../assets/icons/share.svg" alt="Share icon"/>
        <div className="action-bar__view-icons">
            <img src="../../assets/icons/grid.svg" alt="Board view icon"/>
            <img src="../../assets/icons/checklist.svg" alt="Checklist view icon"/>
            <img src="../../assets/icons/bullet-list.svg" alt="Bulletlist view icon"/>
        </div>
    </div>
  );
}

export default ActionBar;
