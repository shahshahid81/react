import { useEffect } from 'react';
import {
  Outlet,
  useSubmit,
  useLoaderData,
  // useNavigation
} from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { getTokenDuration } from '../util/auth';

function RootLayout() {
  // const navigation = useNavigation();

  const submit = useSubmit();

  const token = useLoaderData();
  useEffect(() => {
    let timeoutId = null;
    if (!token) {
      return;
    }

    if (token === 'EXPIRED') {
      submit(null, { action: '/logout', method: 'POST' });
      return;
    }

    const duration = getTokenDuration();

    timeoutId = setTimeout(() => {
      submit(null, { action: '/logout', method: 'POST' });
    }, duration)

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
