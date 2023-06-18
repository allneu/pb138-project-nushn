import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Menu from '../../components/Menu/Menu.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import Subpage from '../Subpage/Subpage.tsx';
import TaskView from '../Views/TaskView/TaskView.tsx';

import './MainPage.css';
import UserView from '../Views/UserView/UserView.tsx';

function MainPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="main-page">
        <Menu isOpen={isMenuOpen} toggleMenu={toggleMenu} />

        <Routes>
          <Route path="" element={<Navigate to="subpage/1" replace />} />
          <Route path="/subpage/:subpageId" element={<Subpage />}>
            <Route path="task/:taskId" element={<TaskView />} />
            <Route path="editUser" element={<UserView />} />
          </Route>
        </Routes>

        <Footer toggleMenu={toggleMenu}/>
    </div>
  );
}

export default MainPage;
