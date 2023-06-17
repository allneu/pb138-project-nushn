import { Routes, Route, Navigate } from 'react-router-dom';

import MainPage from './pages/MainPage/MainPage.tsx';
import LogInPage from './pages/LogInPage/LogInPage.tsx';

function App() {
  return (
    <>
      <Routes>
        {/* Delete Navigate later when other pages are done */}
        <Route path="/" element={<Navigate to="/login"/>} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/subpage/:subpageId/*" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
