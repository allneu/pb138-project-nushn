import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Subpage from '../Subpage/Subpage.tsx';
import TaskView from '../TaskView/TaskView.tsx';

import './MainPage.css';

function MainPage() {
  const [isTaskOpen, setIsTaskOpen] = useState(false);

  const toggleTask = () => {
    setIsTaskOpen(!isTaskOpen);
  };

  return (
        <div className='main-page'>
            <Subpage isTaskOpen={isTaskOpen}/>
            <Routes>
                <Route path="/task/:taskId" element={<TaskView toggleTask={toggleTask}/>} />
            </Routes>
        </div>
  );
}

export default MainPage;
