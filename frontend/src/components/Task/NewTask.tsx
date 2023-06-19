import { Link } from 'react-router-dom';
import './Task.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import projectIcons from '../../../public/assets/icons/projectIcons.json';

function NewTask() {
  return (
    <Link className="task" to='task/newTask'>
        <FontAwesomeIcon className='icon' icon={projectIcons['add-new'].split(' ') as IconProp} />
        <span className="task__name task__name--new">Add new task</span>
    </Link>
  );
}

export default NewTask;
