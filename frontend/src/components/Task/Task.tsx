import { Link, useParams } from 'react-router-dom';
import { TaskType } from '../../models';
import './Task.css';

import projectIcons from '../../../public/assets/icons/projectIcons.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type TaskProps = {
  task: TaskType;
  todoIcon: string;
  doneIcon: string;
};

function Task({ task, todoIcon, doneIcon } : TaskProps) {
  const { userId, subpageId } = useParams();
  return (
      <Link to={`/user/${userId}/subpage/${subpageId}/task/${task.id}`} className="task">
        <FontAwesomeIcon className="icon rounded" icon={task.done ? doneIcon.split(' ') : todoIcon.split(' ')}/>
        <span className={task.done ? 'task__name task__name--done' : 'task__name'}>{task.taskName}</span>
        <FontAwesomeIcon className='icon' icon={projectIcons.edit.split(' ') as IconProp} />
      </Link>
  );
}

export default Task;
