import { Routes, Route, Navigate } from 'react-router-dom';

import Subpage from './pages/Subpage/Subpage.tsx';

function App() {
  return (
    <div>
      <Routes>
        {/* Delete Navigate later when other pages are done */}
        <Route path="/" element={<Navigate to="/subpage/1"/>} />
        <Route path="/subpage/:subpageId/*" element={<Subpage />} />
      </Routes>
    </div>
  );
}

export default App;
