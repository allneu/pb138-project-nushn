import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Menu from '../../components/Menu/Menu.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import Subpage from '../Subpage/Subpage.tsx';
import Homepage from '../../components/Homepage/Homepage.tsx';

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
          <Route index element={<Navigate to="homepage" />} />
          <Route path="homepage/*" element={<Homepage />} />
          <Route path="subpage/:subpageId/*" element={<Subpage />} />
        </Routes>

        <Footer toggleMenu={toggleMenu}/>
    </div>
  );
}

export default MainPage;
