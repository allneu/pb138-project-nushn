import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Subpage from '../Subpage/Subpage.tsx';
import TaskView from '../TaskView/TaskView.tsx';
import Menu from '../../components/Menu/Menu.tsx';

import './MainPage.css';

function MainPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTaskOpen, setIsTaskOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
        <div className='main-page'>
            <Menu isOpen={isMenuOpen} toggleMenu={toggleMenu} />

            <div className={isTaskOpen ? 'hide-on-small' : ''}>
                <Subpage/>
            </div>

            <Routes>
                <Route path="/task/:taskId" element={<TaskView setIsTaskOpen={setIsTaskOpen}/>} />
            </Routes>

            <div className='main-page__footer'>
                <div className="footer__nav-icons">
                    <img src="/assets/icons/menu.svg" onClick={toggleMenu} alt="Subpage menu icon"/>
                    <img src="/assets/icons/add.svg" alt="Add new task icon"/>
                    <img src="/assets/icons/account.svg" alt="User account icon"/>
                </div>
            </div>
        </div>
  );
}

export default MainPage;
