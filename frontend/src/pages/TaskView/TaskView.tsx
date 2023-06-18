import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AutosizeInput from 'react-textarea-autosize';

import { taskFormSchema, TaskFormDataType } from './taskSchema';
import defaultTaskValues from './defaultTaskValues';

import './TaskView.css';

function TaskView() {
  const { subpageId, taskId } = useParams();
  const [formData, setFormData] = useState(defaultTaskValues);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormDataType>({
    values: formData,
    resolver: zodResolver(taskFormSchema),
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
                <img className='icon' src="/assets/icons/back-arrow.svg" alt="Back icon"/>
            </Link>
            <button type="submit">
                <img className='icon' src="/assets/icons/done.svg" alt="Save icon"/>
            </button>
        </nav>

        <div className="task-view__form">
            <div className="input-with-errors py-2.5">
                <AutosizeInput
                    className="task-name"
                    placeholder='New task'
                    value={formData.taskName}
                    {...register('taskName', { onChange })}
                />
                {errors.taskName && <span className="validation-error">{errors.taskName.message}</span>}
            </div>

            <div className="task-view__info">
                <div className='detail'>
                    <div className="detail__label">
                        <img className="w-5 h-5" src="/assets/icons/clock.svg" alt="Created at icon"/>
                        <span>Created</span>
                    </div>
                    <span>Now</span>
                </div>

                <div className='detail'>
                    <div className="detail__label">
                        <img className="w-5 h-5" src="/assets/icons/hourglass.svg" alt="Deadline icon"/>
                        <span>Deadline</span>
                    </div>
                    <div className="input-with-errors">
                        {/* to-do: add value here, warning: it is gonna be painful */}
                        <input type="date"
                            {...register('dueDate', { valueAsDate: true, onChange })}
                        />
                        {errors.dueDate && <span className="validation-error">{errors.dueDate.message}</span>}
                    </div>
                </div>

                <div className='detail'>
                    <div className="detail__label">
                        <img className="w-5 h-5" src="/assets/icons/label.svg" alt="Label icon"/>
                        <span>Label</span>
                    </div>
                    <div className="input-with-errors">
                        <select className="pl-1" {...register('labelId', { onChange })}>
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
                value={formData.content}
                {...register('content', { onChange })}
            />
        </div>
    </form>
  );
}

export default TaskView;
