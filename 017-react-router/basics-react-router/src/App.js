import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import RootLayout from './pages/Root';
import Error from './pages/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        // Setting index to true is same as setting path as empty string. It basically means that whenever the current parent route is active and there is no route matching the children element, use index as true.
        index: true,
        // path: '',
        element: <Home />,
      },
      {
        // Absolute path
        // path: '/products',

        // Relative path
        path: 'products',
        element: <Products />,
      },
      {
        path: 'products/:productId',
        element: <ProductDetails />
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
