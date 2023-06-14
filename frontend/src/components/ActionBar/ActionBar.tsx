import './ActionBar.css';

type ActionBarProps = {
  onViewChange: (newView: string) => void;
};

function ActionBar({ onViewChange }: ActionBarProps) {
  return (
    <div className="action-bar">
        <img className="icon" src="/assets/icons/share.svg" alt="Share icon"/>
        <div className="view-options">
            <div className="option">
                <img className="icon" src="/assets/icons/grid.svg" alt="Board view icon" onClick={() => onViewChange('board')}/>
                <span className="option__name">Board</span>
            </div>
            <div className="option">
                <img className="icon" src="/assets/icons/checklist.svg" alt="Checklist view icon" onClick={() => onViewChange('checklist')}/>
                <span className="option__name">Checklist</span>
            </div>
            <div className="option">
                <img className="icon" src="/assets/icons/bullet-list.svg" alt="Bulletlist view icon" onClick={() => onViewChange('bulletlist')}/>
                <span className="option__name">Bullet list</span>
            </div>
        </div>
    </div>
  );
}

export default ActionBar;
