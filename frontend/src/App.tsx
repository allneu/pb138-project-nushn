import { Route, Routes, Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import Loading from './components/Loading/Loading.tsx';
import MainPage from './pages/MainPage/MainPage.tsx';
import LogInPage from './pages/AuthPages/LogInPage.tsx';
import RegisterPage from './pages/AuthPages/RegisterPage.tsx';

function PrivateRoute() {
  // uncomment this when BE auth works
  // const { auth, isLoading, isError } = useAuth();

  // if (isLoading) return <Loading />;
  // if (!auth || isError) return <Navigate to="/login" />;

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
        <Route path='/signup' element={<RegisterPage />} />
        <Route path="/auth/*" element={<PrivateRoute />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
