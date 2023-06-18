import { Link } from 'react-router-dom';
import { TaskType } from '../../models';
import './Task.css';

import icons from '../../../public/assets/icons/projectIcons.json';

type TaskProps = {
  task: TaskType;
  todoIcon: string;
  doneIcon: string;
};

function Task({ task, todoIcon, doneIcon } : TaskProps) {
  return (
      <Link to={`task/${task.id}`} className="task">
        <i className={`icon rounded ${task.done ? doneIcon : todoIcon}`}/>
        <span className={task.done ? 'task__name task__name--done' : 'task__name'}>{task.taskName}</span>
        <i className={icons.edit}/>
      </Link>
  );
}

export default Task;
