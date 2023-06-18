import MainPage from './pages/MainPage/MainPage.tsx';
import LogInPage from './pages/AuthPages/LogInPage.tsx';
import RegisterPage from './pages/AuthPages/RegisterPage.tsx';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/subpage/:subpageId/*" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
