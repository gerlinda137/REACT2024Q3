import MainPage from '../pages/main/mainPage';
import { Outlet } from 'react-router-dom';
import { searchShows } from '../api/apiHandler';

export async function loader() {
  const shows = await searchShows();
  return { shows };
}

export default function Root() {
  return (
    <div className="container">
      <MainPage />
      <div className="detail-container">
        <Outlet />
      </div>
    </div>
  );
}
