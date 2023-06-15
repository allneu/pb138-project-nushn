import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { z } from 'zod';

// TODO - load the specific task and labels from backend by its ID
import tasks from '../../../public/tasks.json';
import labels from '../../../public/labeledTasks.json';

import './TaskView.css';
import { TaskType } from '../../models';

type TaskViewProps = {
  setIsTaskOpen: (isTaskOpen: boolean) => void;
};

// TODO - validate some max and min length?
const taskSchema = z.object({
  name: z.string().nonempty('Name is required'),
});

function TaskView({ setIsTaskOpen }: TaskViewProps) {
  const { subpageId, taskId } = useParams();
  const textareaRef = useRef(null);
  const formRef = useRef();
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setIsTaskOpen(true);

    return () => {
      setIsTaskOpen(false);
    };
  }, [setIsTaskOpen]);

  // TODO - load the task from backend by its ID
  // if taskId is newTask then create a new empty task
  const getTask = tasks.find((t) => t.id === taskId);
  const [task, setTask] = useState(getTask);
  if (!task) {
    return <div>Task not found</div>;
  }

  const validateAndSetTask = (newTask: TaskType) => {
    try {
      setTask(newTask);
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
      taskSchema.parse(newTask);
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

  return (
    <div className='task-view'>
            <Link to={`/subpage/${subpageId}`}>
              <img src="/assets/icons/back-arrow.svg" alt="Back icon"/>
            </Link>

            <div className="task-view__header">
              <img src={task.icon} alt="Task icon"/>
              <textarea className='header__title'
                          rows={2}
                          value={task.name}
                          onChange={(e) => validateAndSetTask({ ...task, name: e.target.value })}
                />
              {errors['name'] && <p className="error">{errors['name']}</p>}
            </div>

            <div className='task-card'>
                <div className="task-card__details">

                  <div className='task-card__detail'>
                    <div className="detail__label">
                      <img src="/assets/icons/clock.svg" alt="Created at icon"/>
                      <p>Created</p>
                    </div>
                    <p className='detail__info'>{task.createdAt}</p>
                  </div>

                  <div className='task-card__detail'>
                    <div className="detail__label">
                      <img src="/assets/icons/hourglass.svg" alt="Deadline icon"/>
                      <p>Deadline</p>
                    </div>
                    <input type="date"
                          className='detail__input'
                          value={task.dueDate}
                          onChange={(e) => validateAndSetTask({ ...task, dueDate: e.target.value })}
                    />
                  </div>

                  <div className='task-card__detail'>
                    <div className="detail__label">
                      <img src="/assets/icons/label.svg" alt="Label icon"/>
                      <p>Label</p>
                    </div>
                    <select className='detail__input'
                      value={task.labelID}
                      onChange={(e) => validateAndSetTask({ ...task, labelID: e.target.value })}
                    >
                      {labels.map((label) => (
                        <option key={label.id} value={label.id}>
                            {label.name}
                          </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="task-card__line"></div>

                <textarea className='task-card__content'
                          ref={textareaRef}
                          value={task.content}
                          onChange={(e) => validateAndSetTask({ ...task, content: e.target.value })}
                />
            </div>
        </div>
  );
}

export default TaskView;
