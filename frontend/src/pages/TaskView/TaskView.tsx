import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { z } from 'zod';
import AutosizeInput from 'react-textarea-autosize';

import rawTasks from '../../../public/tasks.json';
import labels from '../../../public/labeledTasks.json';

import './TaskView.css';
import '../Subpage/Subpage.css';
import { EditTaskType } from '../../models';
import Footer from '../../components/Footer/Footer.tsx';

const defaultTaskValues: EditTaskType = {
  id: '',
  name: 'New Task',
  status: false,
  dueDate: '',
  labelId: '',
  // TODO - add User ID
  creatorID: '',
  content: 'Description',
};

// import from a different file
const taskSchema = z.object({
  name: z.string()
    .min(3, {
      message: 'Name must be at least 3 characters',
    }),
  content: z.string(),
  labelId: z.string().uuid({ message: 'Task must have a label' }),
  dueDate: z.string()
    .refine((value) => {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(value)) return false;
      const date = new Date(value);
      return !Number.isNaN(date.getTime());
    }, {
      message: 'A valid date is required',
    }),
});

type TaskViewProps = {
  setIsTaskOpen: (isTaskOpen: boolean) => void;
  setTask: (task: EditTaskType | null) => void;
  toggleMenu: () => void;
};

function TaskView({ setIsTaskOpen, setTask, toggleMenu }: TaskViewProps) {
  const { subpageId, taskId } = useParams();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [task, setTaskLocal] = useState<EditTaskType>(defaultTaskValues);

  useEffect(() => {
    if (taskId !== 'newTask') {
      const tasks = rawTasks.map((t) => ({
        ...t,
        dueDate: new Date(t.dueDate),
        createdAt: new Date(t.createdAt),
      }));
      const getTask = tasks.find((t) => t.id === taskId);

      const editableTask: EditTaskType = getTask ? {
        ...getTask,
        dueDate: getTask.dueDate.toISOString().substring(0, 10),
      } : defaultTaskValues;
      setTaskLocal(editableTask);
    } else {
      setTaskLocal(defaultTaskValues);
    }
  }, [taskId]);

  const validateAndSetTask = (editedTask: EditTaskType) => {
    try {
      setTaskLocal(editedTask);
      taskSchema.parse(editedTask);
      setErrors({}); // Reset errors
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.errors.reduce((prev, curr) => ({
          ...prev,
          [curr.path[0].toString()]: curr.message,
        }), {}));
      }
    }
  };

  useEffect(() => {
    setTask(task);
  }, [task, setTask]);

  useEffect(() => {
    setIsTaskOpen(true);
    return () => {
      setIsTaskOpen(false);
    };
  }, [setIsTaskOpen]);

  if (!task) {
    return (<h1>Task not found.</h1>);
  }

  return (
    <div className='task-view'>
      <Link className="task-view__back" to={`/subpage/${subpageId}`}>
        <img className='icon' src="/assets/icons/back-arrow.svg" alt="Back icon"/>
      </Link>

      <header className="task-view__header">
        <div className="validated-input">
        <AutosizeInput
              className={`header__title ${errors['name'] ? 'input--invalid' : ''}`}
              value={task.name}
              onChange={(e) => validateAndSetTask({ ...task, name: e.target.value })}
            />
          {errors['name'] && <p className="error">{errors['name']}</p>}
        </div>
      </header>

      <div className='task-card'>
        <div className="task-card__details">
          <div className='task-card__detail'>
            <div className="detail__label">
              <img className="icon" src="/assets/icons/clock.svg" alt="Created at icon"/>
              <p>Created</p>
            </div>
            <p className='detail__info'>{task.createdAt
              ? task.createdAt.toISOString().substring(0, 10)
              : 'now'}</p>
          </div>

          <div className='task-card__detail'>
            <div className="detail__label">
              <img className='icon' src="/assets/icons/hourglass.svg" alt="Deadline icon"/>
              <p>Deadline</p>
            </div>
            <div className="validated-input">
              <input type="date"
                  min="2000-01-01"
                  className={`detail__input ${errors['dueDate'] ? 'input--invalid' : ''}`}
                  value={task.dueDate}
                  onChange={(e) => {
                    validateAndSetTask({ ...task, dueDate: e.target.value });
                  }}
              />
              {errors['dueDate'] && <p className="error">{errors['dueDate']}</p>}
            </div>
          </div>

          <div className='task-card__detail'>
            <div className="detail__label">
              <img className='icon' src="/assets/icons/label.svg" alt="Label icon"/>
              <p>Label</p>
            </div>
            <div className="validated-input">
              <select className='detail__input'
                value={task.labelId}
                onChange={(e) => validateAndSetTask({ ...task, labelId: e.target.value })}
              >
                <option className="select-option" key='' value=''>
                    -none-
                </option>
                {labels.map((label) => (
                  <option className="select-option" key={label.id} value={label.id}>
                      {label.name}
                    </option>
                ))}
              </select>
              {errors['labelId'] && <p className="error">{errors['labelId']}</p>}
            </div>
          </div>

          <div className='task-card__detail'>
            <div className="detail__label">
              <img className='icon' src={`/assets/icons/${task.status ? 'check-done.svg' : 'check-todo.svg'}`} alt="Status icon"/>
              <p>Status</p>
            </div>
            <select className='detail__input'
              value={task.status ? 'true' : 'false'}
              onChange={(e) => validateAndSetTask({ ...task, status: e.target.value === 'true' })}
              >
              <option className="select-option" key='1' value='true'>
                  done
              </option>
              <option className="select-option" key='2' value='false'>
                  todo
              </option>
            </select>
          </div>
        </div>

        <div className="task-card__line"/>

        <AutosizeInput className='task-card__content'
                  value={task.content}
                  onChange={(e) => validateAndSetTask({ ...task, content: e.target.value })}
        />
      </div>

      <Footer showMenu={true} showNewTask={taskId !== 'newTask'} showUser={true} toggleMenu={toggleMenu}/>
    </div>
  );
}

export default TaskView;
