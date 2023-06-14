import { TaskType } from '../../models';
import './Task.css';

type TaskProps = {
  task: TaskType;
  todoIcon: string;
  doneIcon: string;
};

function Task({ task, todoIcon, doneIcon } : TaskProps) {
  return (
      <div className="task">
        <img className="icon rounded" src={task.status ? doneIcon : todoIcon} alt="Task icon" />
        <span className={task.status ? 'task__name task__name--done' : 'task__name'}>{task.name}</span>
        <img className="icon" src="/assets/icons/edit.svg" alt="Edit task icon"/>
      </div>
  );
}

export default Task;
