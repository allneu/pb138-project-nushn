import { Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';

import Subpage from './pages/Subpage/Subpage.tsx';
import Menu from './components/Menu/Menu.tsx';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <Menu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <Routes>
        <Route path=":subpageId" element={<Subpage toggleMenu={toggleMenu}/>} />
      </Routes>
    </div>
  );
}

export default App;
