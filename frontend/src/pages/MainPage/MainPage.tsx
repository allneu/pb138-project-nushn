import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Menu from '../../components/Menu/Menu.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import Subpage from '../Subpage/Subpage.tsx';
import TaskView from '../TaskView/TaskView.tsx';

import './MainPage.css';

function MainPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="main-page">
        <Menu isOpen={isMenuOpen} toggleMenu={toggleMenu} />

        <Routes>
          <Route index element={<Navigate to="/subpage/1"/>} />
          <Route path="subpage/:subpageId" element={<Subpage />}>
            <Route path="task/:taskId" element={<TaskView />} />
          </Route>
        </Routes>

        <Footer toggleMenu={toggleMenu}/>
    </div>
  );
}

export default MainPage;
