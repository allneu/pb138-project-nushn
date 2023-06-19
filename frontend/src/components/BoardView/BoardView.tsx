import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import LabelTasks from './LabelTasks.tsx';
import './BoardView.css';
import projectIcons from '../../../public/assets/icons/projectIcons.json';
import { LabelWithTasksType } from '../../models/labelTypes';

type BoardViewProps = {
  labelsWithTasks: LabelWithTasksType[],
};

function BoardView({
  labelsWithTasks,
}: BoardViewProps) {
  return (
    <div className="">
      <div className="columns-wrapper">
        {
          labelsWithTasks.map((labelWithTasks) => (
            <LabelTasks key={labelWithTasks.id} tasks={labelWithTasks.tasks} />
          ))
        }
        <div className='board-view__new-label'>
          <FontAwesomeIcon className='icon' icon={projectIcons['add-new'].split(' ') as IconProp} />
          <span className="text-sm font-semibold">Add new label</span>
        </div>
      </div>
    </div>
  );
}

export default BoardView;
