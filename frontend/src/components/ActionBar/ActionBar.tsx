import './ActionBar.css';

type ActionBarProps = {
  onViewChange: (newView: string) => void;
};

function ActionBar({ onViewChange }: ActionBarProps) {
  return (
    <div className="action-bar">
        <img src="/assets/icons/share.svg" alt="Share icon"/>
        <div className="action-bar__view-icons">
            <img src="/assets/icons/grid.svg" alt="Board view icon" onClick={() => onViewChange('board')}/>
            <img src="/assets/icons/checklist.svg" alt="Checklist view icon" onClick={() => onViewChange('checklist')}/>
            <img src="/assets/icons/bullet-list.svg" alt="Bulletlist view icon" onClick={() => onViewChange('bulletlist')}/>
        </div>
    </div>
  );
}

export default ActionBar;
