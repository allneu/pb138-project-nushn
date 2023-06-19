import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AutosizeInput from 'react-textarea-autosize';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { labelFormSchema, LabelFormDataType } from './labelSchema';
import defaultLabelValues from './defaultLabelValues';
import { TaskType } from '../../models';

import Task from '../Task/Task.tsx';
import NewTask from '../Task/NewTask.tsx';
import projectIcons from '../../../public/assets/icons/projectIcons.json';

import './BoardView.css';

type LabelTasksProps = {
  tasks: TaskType[];
};

function LabelTasks({
  tasks,
} : LabelTasksProps) {
  const [showTasks, setShowTasks] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LabelFormDataType>({
    values: defaultLabelValues,
    resolver: zodResolver(labelFormSchema),
  });

  const onSubmit = (data: LabelFormDataType) => {
    console.log(data);
  };

  return (
      <div>
        <form className="label">
            <div className="input-with-errors">
                <AutosizeInput
                    className="label-name"
                    placeholder='Label name'
                    {...register('name', { onBlur: handleSubmit(onSubmit) })}
                />
                {errors.name && <span className="validation-error">{errors.name.message}</span>}
            </div>
            <div className="label__line"/>
            <div className="label__show">
              { showTasks
                ? <FontAwesomeIcon className='icon' icon={projectIcons['collapse-arrow'].split(' ') as IconProp} onClick={() => setShowTasks(false)}/>
                : <FontAwesomeIcon className='icon' icon={projectIcons['expand-arrow'].split(' ') as IconProp} onClick={() => setShowTasks(true)}/>
              }
            </div>
        </form>

        <div className="label-tasks">
          { showTasks
            ? tasks.map((task: TaskType) => (
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
