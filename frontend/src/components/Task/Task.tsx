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
        <img className="task__icon" src={task.status ? doneIcon : todoIcon} alt="Task icon" />
        <h3 className={task.status ? 'task__name done' : 'task__name todo'}>{task.name}</h3>
        <img className="flex-none" src="/assets/icons/edit.svg" alt="Edit task icon"/>
      </div>
  );
}

export default Task;
