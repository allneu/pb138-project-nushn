import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage.tsx';
import LogInPage from './pages/AuthPages/LogInPage.tsx';
import RegisterPage from './pages/AuthPages/RegisterPage.tsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/user/:userId/*" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
