import { Outlet } from 'react-router-dom';
import { searchShows } from '../api/apiHandler';

export async function loader() {
  const shows = await searchShows();
  return { shows };
}

export default function Root() {
  return (
    <div className="container">
      <Outlet />
      {/* <MainPage /> */}
      <div className="detail-container"></div>
    </div>
  );
}
