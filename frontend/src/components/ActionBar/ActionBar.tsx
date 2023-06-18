import './ActionBar.css';

import icons from '../../../public/assets/icons/projectIcons.json';

type ActionBarProps = {
  onViewChange: (newView: string) => void;
};

function ActionBar({ onViewChange }: ActionBarProps) {
  return (
    <div className="action-bar">
        <i className={icons.share}/>
        <div className="view-options">
            <div className="option" onClick={() => onViewChange('board')}>
                <i className={icons.boardview} />
                <span className="option__name">Board</span>
            </div>
            <div className="option" onClick={() => onViewChange('checklist')}>
                <i className={icons.checklist} />
                <span className="option__name">Checklist</span>
            </div>
            <div className="option" onClick={() => onViewChange('bulletlist')}>
                <i className={icons.bulletlist} />
                <span className="option__name">Bullet list</span>
            </div>
        </div>
    </div>
  );
}

export default ActionBar;
