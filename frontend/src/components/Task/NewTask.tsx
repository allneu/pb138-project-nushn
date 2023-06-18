import { Link } from 'react-router-dom';
import './Task.css';
import icons from '../../../public/assets/icons/projectIcons.json';

function NewTask() {
  return (
    <Link className="task" to='task/newTask'>
        <i className={`rounded ${icons['add-new']}`} />
        <span className="task__name task__name--new">Add new task</span>
    </Link>
  );
}

export default NewTask;
