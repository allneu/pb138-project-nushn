import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

// TODO - load the task from backend by its ID
import tasks from '../../../public/tasks.json';

import './TaskView.css';

type TaskViewProps = {
  setIsTaskOpen: (isTaskOpen: boolean) => void;
};

function TaskView({ setIsTaskOpen }: TaskViewProps) {
  const { subpageId, taskId } = useParams();

  useEffect(() => {
    setIsTaskOpen(true);

    return () => {
      setIsTaskOpen(false);
    };
  }, [setIsTaskOpen]);

  // TODO - load the subpage from backend by its ID
  const task = tasks.find((t) => t.id === taskId);

  return (
        <div className='task-view'>
            <Link to={`/subpage/${subpageId}`}>
              <img src="/assets/icons/back-arrow.svg" alt="Back icon"/>
            </Link>
            <h1>{task?.name}</h1>
            <div className='task-container'>
                <div className="task-container__details">
                  <div className='detail'>
                    <img src="/assets/icons/clock.svg" alt="Created at icon"/>
                    <p>Created</p>
                    <p>{task?.createdAt}</p>
                  </div>
                  <div className='detail'>
                    <img src="/assets/icons/hourglass.svg" alt="Deadline icon"/>
                    <p>Deadline</p>
                    <p>{task?.dueDate}</p>
                  </div>
                  <div className='detail'>
                    <img src="/assets/icons/label.svg" alt="Label icon"/>
                    <p>Label</p>
                    <p>{task?.labelID}</p>
                  </div>
                </div>
                <div className="task-container__line"></div>
                <div className="task-container__content">{task?.content}</div>
            </div>
        </div>
  );
}

export default TaskView;
