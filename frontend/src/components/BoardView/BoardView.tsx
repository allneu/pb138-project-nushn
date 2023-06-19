import LabelTasks from './LabelTasks.tsx';
import './BoardView.css';
import projectIcons from '../../../public/assets/icons/projectIcons.json';

// TODO - GET subpage labels from backend including tasks in label order
import labels from '../../../public/labeledTasks.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

function BoardView() {
  // Get the subpage ID from the URL and load the labels from backend including tasks in label order
  // const { subpageId } = useParams();
  return (
    <div className="">
      <div className="columns-wrapper">
        {labels.map((label) => (
          <LabelTasks key={label.id} label={label} />
        ))}
        <div className='board-view__new-label'>
          <FontAwesomeIcon className='icon' icon={projectIcons['add-new'].split(' ') as IconProp} />
          <span className="text-sm font-semibold">Add new label</span>
        </div>
      </div>
    </div>
  );
}

export default BoardView;
