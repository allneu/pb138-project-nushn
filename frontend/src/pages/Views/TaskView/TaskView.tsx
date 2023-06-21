import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AutosizeInput from 'react-textarea-autosize';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { taskFormSchema, TaskFormDataType } from './taskSchema';

import projectIcons from '../../../../public/assets/icons/projectIcons.json';
import '../Views.css';
import useUpdateTask from '../../../hooks/useUpdateTask';
import { LabelType, TaskType } from '../../../models';

type TaskViewProps = {
  tasks: TaskType[],
  labels: LabelType[],
};

function TaskView({
  tasks,
  labels,
}: TaskViewProps) {
  const { subpageId, taskId } = useParams();
  const navigate = useNavigate();

  const task = tasks.find((t) => t.id === taskId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormDataType>({
    values: {
      ...task!,
      dueDate: task!.dueDate.split('T')[0]!,
    },
    resolver: zodResolver(taskFormSchema),
  });

  const { updateTask } = useUpdateTask({ taskId: taskId! });

  const onSubmit = (data: TaskFormDataType) => {
    console.log(data);
    updateTask({
      ...data,
      dueDate: (new Date(data.dueDate)).toISOString(),
    });
    navigate(`/auth/subpage/${subpageId}`);
  };

  return (
    <form className="task-view" onSubmit={handleSubmit(onSubmit)}>
        <nav className="task-view__nav">
            <Link to={`/auth/subpage/${subpageId}`}>
                <FontAwesomeIcon className='icon' icon={projectIcons['back-arrow'].split(' ') as IconProp} />
            </Link>
            <button type="submit">
                <FontAwesomeIcon className='icon' icon={projectIcons.submit.split(' ') as IconProp} />
            </button>
        </nav>

        <div className="task-view__form">
            <div className="input-with-errors py-2.5">
                <AutosizeInput
                    className="task-name"
                    placeholder='New task'
                    {...register('taskName')}
                />
                {errors.taskName && <span className="validation-error">{errors.taskName.message}</span>}
            </div>

            <div className="task-view__info">
                <div className='detail'>
                    <div className="detail__label">
                        <FontAwesomeIcon className='icon' icon={projectIcons.clock.split(' ') as IconProp} />
                        <span>Created</span>
                    </div>
                    <span>Now</span>
                </div>

                <div className='detail'>
                    <div className="detail__label">
                        <FontAwesomeIcon className='icon' icon={projectIcons.hourglass.split(' ') as IconProp} />
                        <span>Deadline</span>
                    </div>
                    <div className="input-with-errors">
                        <input type="date"
                            {...register('dueDate')}
                        />
                        {errors.dueDate && <span className="validation-error">{errors.dueDate.message}</span>}
                    </div>
                </div>

                <div className='detail'>
                    <div className="detail__label">
                        <FontAwesomeIcon className='icon' icon={projectIcons.label.split(' ') as IconProp} />
                        <span>Label</span>
                    </div>
                    <div className="input-with-errors">
                        <select className="pl-1" {...register('labelId')}>
                            {labels.map((label) => (
                                <option className="text-xs" key={label.id} value={label.id}>
                                    {label.name}
                                </option>
                            ))}
                        </select>
                        {errors.labelId && <span className="validation-error">{errors.labelId.message}</span>}
                    </div>
                </div>

                <div className="line"/>
            </div>

            <AutosizeInput className="task-view__content"
                placeholder='Task description'
                {...register('content')}
            />
        </div>
    </form>
  );
}

export default TaskView;
