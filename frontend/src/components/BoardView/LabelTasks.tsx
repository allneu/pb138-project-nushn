import { useState } from 'react';
import { LabelType, TaskType } from '../../models';

import Task from '../Task/Task.tsx';
import NewTask from '../Task/NewTask.tsx';

import './BoardView.css';

type LabelTasksProps = {
  label: LabelType;
};

function LabelTasks({ label } : LabelTasksProps) {
  const [showTasks, setShowTasks] = useState(true);
  const todoIcon = '/assets/icons/check-todo.svg';
  const doneIcon = '/assets/icons/check-done.svg';

  return (
      <div className='label-tasks'>
        <div className="label">
            <h2 className="label__name">{label.name}</h2>
            <div className="label__line"/>

            { showTasks
              ? <img src="/assets/icons/collapse-arrow.svg"
                            className="label__show" alt="Collapse tasks arrow icon"
                            onClick={() => setShowTasks(false)}/>
              : <img src="/assets/icons/expand-arrow.svg"
                            className="label__show" alt="Expand tasks arrow icon"
                            onClick={() => setShowTasks(true)}/>
            }
        </div>

        <div>
          { showTasks
            ? label.tasks.map((task: TaskType) => (
                    <Task key={task.id} task={task} todoIcon={todoIcon} doneIcon={doneIcon}/>
            ))
            : <></>
          }
          { showTasks ? <NewTask /> : <></>}
        </div>
      </div>
  );
}

export default LabelTasks;
