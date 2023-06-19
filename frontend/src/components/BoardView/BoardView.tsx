import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import LabelTasks from './LabelTasks.tsx';
import './BoardView.css';
import projectIcons from '../../../public/assets/icons/projectIcons.json';
import { LabelType } from '../../models/labelTypes';
import { TaskType } from '../../models/taskTypes';

type BoardViewProps = {
  labels: LabelType[],
  tasks: TaskType[],
};

function BoardView({
  labels,
  tasks,
}: BoardViewProps) {
  return (
    <div className="">
      <div className="columns-wrapper">
        {
          labels.map((label) => {
            const labelTasks = tasks.filter((task) => task.labelId === label.id);
            return (
              <LabelTasks key={label.id} tasks={labelTasks} />
            );
          })
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
