import { Routes, Route, Navigate } from 'react-router-dom';

import MainPage from './pages/MainPage/MainPage.tsx';
import LogInPage from './pages/LogInRegisterPages/LogInPage.tsx';
import RegisterPage from './pages/LogInRegisterPages/RegisterPage.tsx';

function App() {
  return (
    <>
      <Routes>
        {/* Delete Navigate later when other pages are done */}
        <Route path="/" element={<Navigate to="/login"/>} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/subpage/:subpageId/*" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
