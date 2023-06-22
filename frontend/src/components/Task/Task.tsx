import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { TaskType } from '../../models';
import DeleteDialog from '../Dialogs/DeleteDialog/DeleteDialog.tsx';

import './Task.css';
import useDeleteTask from '../../hooks/delete/useDeleteTask';
import useUpdateTaskInfo from '../../hooks/update/useUpdateTaskInfo';
import projectIcons from '../../../public/assets/icons/projectIcons.json';

type TaskProps = {
  task: TaskType;
  todoIcon: string;
  doneIcon: string;
};

function Task({ task, todoIcon, doneIcon } : TaskProps) {
  const { deleteTask } = useDeleteTask({ redirect: '' });

  const { updateTaskInfo } = useUpdateTaskInfo({ taskId: task.id });

  const onDoneChange = () => {
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
        <div className='hover:border hover:border-gray-200 rounded-lg p-1'>
        <FontAwesomeIcon
          className="icon rounded"
          icon={projectIcons.delete.split(' ') as IconProp}
          onClick={() => deleteTask(task.id)}
        />
        </div>
    </div>
  );
}

export default Task;
