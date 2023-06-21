import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AutosizeInput from 'react-textarea-autosize';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { labelFormSchema, LabelFormDataType } from './labelSchema';
import { LabelWithTasksType, TaskType } from '../../models';
import useUpdateLabel from '../../hooks/update/useUpdateLabel';

import SortableItem from '../SortableItem/SortableItem.tsx';
import Task from '../Task/Task.tsx';
import NewTask from '../Task/NewTask.tsx';
import projectIcons from '../../../public/assets/icons/projectIcons.json';

import './BoardView.css';
import useDeleteLabel from '../../hooks/delete/useDeleteLabel';
import DeleteDialog from '../Dialogs/DeleteDialog/DeleteDialog.tsx';

type LabelTasksProps = {
  labelWithTasks: LabelWithTasksType,
};

function LabelTasks({
  labelWithTasks,
} : LabelTasksProps) {
  const [showTasks, setShowTasks] = useState(true);
  const { deleteLabel } = useDeleteLabel({ redirect: '' });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LabelFormDataType>({
    values: labelWithTasks,
    resolver: zodResolver(labelFormSchema),
  });

  const { updateLabel } = useUpdateLabel({ labelId: labelWithTasks.id });

  const onSubmit = (data: LabelFormDataType) => {
    updateLabel(data);
  };

  return (
      <div>
        <form className="label">
            <div className="input-with-errors">
              <div className='flex'>
                <AutosizeInput
                    className="label-name"
                    placeholder='Label name'
                    {...register('name', { onBlur: handleSubmit(onSubmit) })}
                />
                <DeleteDialog deleteEntity={() => deleteLabel(labelWithTasks.id)} />
                </div>
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
            ? <SortableContext
              items={labelWithTasks.tasks.map((task) => task.id)}
              strategy={verticalListSortingStrategy}
            >
              {
                labelWithTasks.tasks.map((task: TaskType) => (
                  <SortableItem key={task.id} id={task.id}>
                    <Task task={task} todoIcon={projectIcons['check-todo']} doneIcon={projectIcons['check-done']}/>
                  </SortableItem>
                ))
              }
            </SortableContext>
            : <></>
          }
          { showTasks ? <NewTask labelId={labelWithTasks.id}/> : <></>}
        </div>
      </div>
  );
}

export default LabelTasks;
