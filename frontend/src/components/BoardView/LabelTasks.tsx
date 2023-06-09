import { useState } from 'react';
import Task from '../Task/Task.tsx';
import './BoardView.css';

function LabelTasks() {
  const [showTasks, setShowTasks] = useState(true);

  return (
      <div className='label-tasks'>
        <div className="label">
            <h2 className="label__name">label</h2>
            <div className="label__line"/>

            { showTasks
              ? <img src="../../assets/icons/collapse-arrow.svg"
                            className="label__show" alt="Collapse tasks arrow icon"
                            onClick={() => setShowTasks(false)}/>
              : <img src="../../assets/icons/expand-arrow.svg"
                            className="label__show" alt="Expand tasks arrow icon"
                            onClick={() => setShowTasks(true)}/>
            }
        </div>

        <div>
          { showTasks
            ? <>
                <Task name='This is the Task #1' done={false} />
                <Task name='This is the Task #2' done={true} />
                <Task name='Add new Task'/>
              </>
            : <></>
          }
        </div>
      </div>
  );
}

export default LabelTasks;
