import { useState } from 'react';
import { LabelType, TaskType } from '../../models';

import Task from '../Task/Task.tsx';
import NewTask from '../Task/NewTask.tsx';
import icons from '../../../public/assets/icons/projectIcons.json';

import './BoardView.css';

type LabelTasksProps = {
  label: LabelType;
};

function LabelTasks({ label } : LabelTasksProps) {
  const [showTasks, setShowTasks] = useState(true);

  return (
      <div>
        <div className="label">
            <span className="label__name">{label.name}</span>
            <div className="label__line"/>
            <div className="label__show">
              { showTasks
                ? <i className={icons['collapse-arrow']} onClick={() => setShowTasks(false)}/>
                : <i className={icons['expand-arrow']} onClick={() => setShowTasks(true)}/>
              }
            </div>
        </div>

        <div className="label-tasks">
          { showTasks
            ? label.tasks.map((task: TaskType) => (
                  <Task key={task.id} task={task} todoIcon={icons['check-todo']} doneIcon={icons['check-done']}/>
            ))
            : <></>
          }
          { showTasks ? <NewTask /> : <></>}
        </div>
      </div>
  );
}

export default LabelTasks;
