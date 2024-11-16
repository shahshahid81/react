import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

export default function Root() {
  return (
    <>
      <MainNavigation />
      <main>
        {/* 
          Outlet renders the component that we have specified as the child of the current route. Refer to the route definition to check the children routes and components.
        */}
        <Outlet />
      </main>
    </>
  );
}
