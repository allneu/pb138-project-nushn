import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { z } from 'zod';

import Subpage from '../Subpage/Subpage.tsx';
import TaskView from '../TaskView/TaskView.tsx';
import Menu from '../../components/Menu/Menu.tsx';
import { EditTaskType, CreateTaskType } from '../../models';

import './MainPage.css';

// TODO - import from a diffent file later, duplicity in TaskView.tsx
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

function MainPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [task, setTask] = useState<EditTaskType | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeView = () => {
    setIsTaskOpen(false);
    // TODO - query to update or create task to backend
    // TODO - make sure that the task changed before updating
    // TODO - create new task if task.id is empty
    if (task) {
      try {
        taskSchema.parse(task);
        const sendTask: CreateTaskType = {
          ...task,
          dueDate: new Date(task.dueDate),
        };
        // Send the task...
        console.log('Task to be sent:', sendTask);
      } catch (error) {
        console.error('Error validating task:', error);
        // some error handling if create or update fails
      }
    }
  };

  useEffect(() => {
    if (!isTaskOpen && task) {
      closeView();
    }
  }, [isTaskOpen, task]);

  return (
    <div className='main-page'>
      <Menu isOpen={isMenuOpen} toggleMenu={toggleMenu} />

      <div className={isTaskOpen ? 'hidden lg:block flex h-screen flex-grow' : 'flex h-screen flex-grow'}>
          <Subpage toggleMenu={toggleMenu}/>
      </div>

      <Routes>
          <Route path="/task/:taskId" element={<TaskView setIsTaskOpen={setIsTaskOpen} setTask={setTask} toggleMenu={toggleMenu}/>} />
      </Routes>
    </div>
  );
}

export default MainPage;
