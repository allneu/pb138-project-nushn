import { useParams } from "react-router-dom";
import NewTask from '../Task/NewTask.tsx';
import Task from '../Task/Task.tsx';

import './ListView.css';

// TODO - GET tasks from backend
import tasks from '../../../public/tasks.json';

function ListView({ type } : { type : string }) { // type = 'check' | 'bullet'
  // TODO - Get the subpage ID from the URL and load the tasks from backend in the subpage order
  // const { subpageId } = useParams();

  let todoIcon : string;
  let doneIcon : string;

  if (type === 'check') {
    todoIcon = '../../../public/assets/icons/check-todo.svg';
    doneIcon = '../../../public/assets/icons/check-done.svg';
  } else { // type === 'bullet'
    todoIcon = '../../../public/assets/icons/bullet-todo.svg';
    doneIcon = '../../../public/assets/icons/bullet-done.svg';
  }

  return (
      <div className='list'>
        {tasks.map((task) => (
          <Task key={task.id} task={task} todoIcon={todoIcon} doneIcon={doneIcon}/>
        ))}
        <NewTask />
      </div>
  );
}

export default ListView;
