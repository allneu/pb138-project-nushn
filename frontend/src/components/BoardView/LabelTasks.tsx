import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AutosizeInput from 'react-textarea-autosize';

import { labelFormSchema, LabelFormDataType } from './labelSchema';
import defaultLabelValues from './defaultLabelValues';
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

            { showTasks
              ? <img src="/assets/icons/collapse-arrow.svg"
                            className="icon label__show" alt="Collapse tasks arrow icon"
                            onClick={() => setShowTasks(false)}/>
              : <img src="/assets/icons/expand-arrow.svg"
                            className="icon label__show" alt="Expand tasks arrow icon"
                            onClick={() => setShowTasks(true)}/>
            }
        </form>

        <div className="label-tasks">
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
