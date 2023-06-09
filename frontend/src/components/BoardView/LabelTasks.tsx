import { useState } from 'react';
import BoardViewTask from './BoardViewTask.tsx';

function LabelTasks() {
  const [showTasks, setShowTasks] = useState(true);

  return (
      <>
        <div className="label">
            <h2 className="label__name">label #1</h2>
            <div className="label__line"/>

            { showTasks
              ? <img src="../../assets/icons/expand-arrow.svg"
                            className="label__icon" alt="Expand tasks arrow icon"
                            onClick={() => setShowTasks(false)}/>
              : <img src="../../assets/icons/collapse-arrow.svg"
                            className="label__icon" alt="Collaps tasks arrow icon"
                            onClick={() => setShowTasks(true)}/>
            }
        </div>
        <div className="tasks">
          { showTasks
            ? <BoardViewTask />
            : <></>
          }
        </div>
      </>
  );
}

export default LabelTasks;
