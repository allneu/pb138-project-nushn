import { Routes, Route, Navigate } from 'react-router-dom';

import MainPage from './pages/MainPage/MainPage.tsx';

function App() {
  return (
    <div>
      <Routes>
        {/* Delete Navigate later when other pages are done */}
        <Route path="/" element={<Navigate to="/subpage/1"/>} />
        <Route path="/subpage/:subpageId/*" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
