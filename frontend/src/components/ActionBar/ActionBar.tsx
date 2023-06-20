import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import './ActionBar.css';
import ViewType from '../../pages/Subpage/viewType';
import projectIcons from '../../../public/assets/icons/projectIcons.json';
import UseDeleteSubpage from '../../hooks/delete/useDeleteSubpage';
import { useParams } from 'react-router-dom';

type ActionBarProps = {
  onViewChange: (newView: ViewType) => void;
};

function ActionBar({ onViewChange }: ActionBarProps) {
  const { subpageId } = useParams();
  const { deleteSubpage } = UseDeleteSubpage({ redirect: '/' });

  function handleDeleteSubpage() {
    deleteSubpage(subpageId || '');
  }

  return (
    <div className="action-bar">
        <div className="subpage-options">
          <FontAwesomeIcon className='icon' icon={projectIcons.share.split(' ') as IconProp} />
          <FontAwesomeIcon className='icon' icon={projectIcons.delete.split(' ') as IconProp} onClick={handleDeleteSubpage} />
        </div>
        <div className="subpage-options">
            <div className="option" onClick={() => onViewChange('board')}>
                <FontAwesomeIcon className='icon' icon={projectIcons.boardview.split(' ') as IconProp} />
                <span className="option__name">Board</span>
            </div>
            <div className="option" onClick={() => onViewChange('checklist')}>
                <FontAwesomeIcon className='icon' icon={projectIcons.checklist.split(' ') as IconProp} />
                <span className="option__name">Checklist</span>
            </div>
            <div className="option" onClick={() => onViewChange('bulletlist')}>
                <FontAwesomeIcon className='icon' icon={projectIcons.bulletlist.split(' ') as IconProp} />
                <span className="option__name">Bullet list</span>
            </div>
        </div>
    </div>
  );
}

export default ActionBar;
