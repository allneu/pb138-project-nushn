import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { TaskType } from '../../models';
import DeleteDialog from '../Dialogs/DeleteDialog/DeleteDialog.tsx';

import './Task.css';
import useDeleteTask from '../../hooks/delete/useDeleteTask';
import useUpdateTaskInfo from '../../hooks/update/useUpdateTaskInfo';

type TaskProps = {
  task: TaskType;
  todoIcon: string;
  doneIcon: string;
};

function Task({ task, todoIcon, doneIcon } : TaskProps) {
  const { deleteTask } = useDeleteTask({ redirect: '' });

  const { updateTaskInfo } = useUpdateTaskInfo({ taskId: task.id });

  const onDoneChange = () => {
    console.log('changing');
    updateTaskInfo({
      done: !task.done,
    });
  };

  return (
    <div className="task">
        <FontAwesomeIcon
          className="icon rounded"
          icon={(task.done ? doneIcon.split(' ') : todoIcon.split(' ')) as IconProp}
          onClick={onDoneChange}
        />
        <Link to={`task/${task.id}`} className='flex-grow'>
          <span className={task.done ? 'task__name task__name--done' : 'task__name'}>{task.taskName}</span>
        </Link>
        <DeleteDialog deleteEntity={() => deleteTask(task.id)}/>
    </div>
  );
}

export default Task;
