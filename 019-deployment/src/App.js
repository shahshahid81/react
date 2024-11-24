import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Directly importing will eagerly load the components and add it to main bundle.
// import BlogPage, { loader as postsLoader } from './pages/Blog';
// import PostPage, { loader as postLoader } from './pages/Post';
import HomePage from './pages/Home';
import RootLayout from './pages/Root';

// Note that we have to use lazy because import will return a promise and we want jsx code instead which can be rendered which is handled by the lazy function
const BlogPage = lazy(() => import('./pages/Blog'));
const PostPage = lazy(() => import('./pages/Post'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [
          // { index: true, element: <BlogPage />, loader: postsLoader },
          // { path: ':id', element: <PostPage />, loader: postLoader },

          {
            index: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <BlogPage />
              </Suspense>
            ),
            loader: (payload) =>
              import('./pages/Blog').then((module) => module.loader(payload)),
          },
          {
            path: ':id',
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <PostPage />
              </Suspense>
            ),
            loader: (payload) =>
              import('./pages/Post').then((module) => module.loader(payload)),
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
