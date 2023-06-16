import { Link } from 'react-router-dom';
import './Task.css';

function NewTask() {
  return (
    <Link className="task" to='task/newTask'>
        <img className="icon rounded" src="/assets/icons/add_gray.svg" alt="Checklist task icon" />
        <span className="task__name task__name--new">Add new task</span>
    </Link>
  );
}

export default NewTask;
