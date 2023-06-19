import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AutosizeInput from 'react-textarea-autosize';

import { taskFormSchema, TaskFormDataType } from './taskSchema';
import defaultTaskValues from './defaultTaskValues';

import '../Views.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import projectIcons from '../../../../public/assets/icons/projectIcons.json';

function TaskView() {
  const { subpageId, taskId } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormDataType>({
    values: defaultTaskValues,
    resolver: zodResolver(taskFormSchema),
  });

  // to-do: onSubmit update/create task
  const onSubmit = (data: TaskFormDataType) => {
    console.log(data);
    navigate(`/subpage/${subpageId}`);
  };

  // dummy labels, to-do: get them from backend
  const labels: {
    id: string, name: string
  }[] = [
    { name: 'unlabeled', id: '1' },
  ];

  return (
    <form className="task-view" onSubmit={handleSubmit(onSubmit)}>
        <nav className="task-view__nav">
            <Link to={`/subpage/${subpageId}`}>
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
