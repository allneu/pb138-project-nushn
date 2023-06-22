import { Route, Routes } from 'react-router-dom';
import UserView from '../../pages/Views/UserView/UserView.tsx';

function Homepage() {
  return (
    <div className="flex justify-center items-center flex-grow self-center">
      <div>
        <span className="text-notion text-lg">Welcome to Nushn! Add new subpage to start!</span>
      </div>
      <Routes>
        <Route path="editUser" element={<UserView />} />
      </Routes>
    </div>
  );
}

export default Homepage;
