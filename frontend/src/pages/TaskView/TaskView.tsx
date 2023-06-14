import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

type TaskViewProps = {
  toggleTask: () => void;
};
function TaskView({ toggleTask }: TaskViewProps) {
  const { subpageId, taskId } = useParams();

  useEffect(() => {
    toggleTask();
  }, []);

  return (
        <div>
            <Link to={`/subpage/${subpageId}`} onClick={toggleTask}>
              <img src="/assets/icons/back-arrow.svg" alt="Back icon"/>
            </Link>
            <h1>Task Page {taskId} and subpage {subpageId}</h1>
        </div>
  );
}

export default TaskView;
