import { Route, Routes, Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import Notice from './components/Notice/Notice.tsx';
import MainPage from './pages/MainPage/MainPage.tsx';
import LogInPage from './pages/AuthPages/LogInPage.tsx';
import SignUpPage from './pages/AuthPages/SignUpPage.tsx';

function PrivateRoute() {
  const { auth, isLoading, isError } = useAuth();

  if (isLoading) return <Notice message={'The page is loading...'} />;
  if (!auth || isError) return <Navigate to="/login" />;

  return (
    <MainPage />
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Navigate to="/auth" />} />
        <Route path='/login' element={<LogInPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path="/auth/*" element={<PrivateRoute />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
