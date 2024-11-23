import { Outlet, useNavigation } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

export default function Root() {
  // Fetching the current navigation details
  // const navigation = useNavigation();

  return <>
    <MainNavigation />
    <main>
      {/* Note that the loader will be shown on the current page instead of the page where the loader function is called since it will be rendered only after the completion of function execution */}
      {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
      <Outlet />
    </main>
  </>
}