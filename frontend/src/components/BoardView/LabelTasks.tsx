import { useState } from 'react';
import { LabelType, TaskType } from '../../models';

import Task from '../Task/Task.tsx';
import NewTask from '../Task/NewTask.tsx';
import projectIcons from '../../../public/assets/icons/projectIcons.json';

import './BoardView.css';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
                ? <FontAwesomeIcon className='icon' icon={projectIcons['collapse-arrow'].split(' ') as IconProp} onClick={() => setShowTasks(false)}/>
                : <FontAwesomeIcon className='icon' icon={projectIcons['expand-arrow'].split(' ') as IconProp} onClick={() => setShowTasks(true)}/>
              }
            </div>
        </div>

        <div className="label-tasks">
          { showTasks
            ? label.tasks.map((task: TaskType) => (
                  <Task key={task.id} task={task} todoIcon={projectIcons['check-todo']} doneIcon={projectIcons['check-done']}/>
            ))
            : <></>
          }
          { showTasks ? <NewTask /> : <></>}
        </div>
      </div>
  );
}

export default LabelTasks;
