import { Link, useParams } from 'react-router-dom';

function TaskView() {
  const { subpageId, taskId } = useParams();

  return (
        <div>
            <Link to={`/subpage/${subpageId}`}>
              <img src="/assets/icons/back-arrow.svg" alt="Back icon"/>
            </Link>
            <h1>Task Page {taskId} and subpage {subpageId}</h1>
        </div>
  );
}

export default TaskView;
