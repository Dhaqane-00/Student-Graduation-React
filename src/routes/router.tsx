/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from 'react';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import paths, { rootPaths } from './paths';
import Splash from 'components/loading/Splash';
import PageLoader from '../components/loading/PageLoader';

const App = lazy(() => import('App'));
const MainLayout = lazy(async () => {
  return Promise.all([
    import('layouts/main-layout'),
    new Promise((resolve) => setTimeout(resolve, 1000)),
  ]).then(([moduleExports]) => moduleExports);
});
const AuthLayout = lazy(async () => {
  return Promise.all([
    import('layouts/auth-layout'),
    new Promise((resolve) => setTimeout(resolve, 1000)),
  ]).then(([moduleExports]) => moduleExports);
});

const Error404 = lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return import('pages/errors/Error404');
});

const Dashboard = lazy(() => import('pages/home/Dashboard'));
const Sales = lazy(() => import('pages/home/Sales'));
const Prediction = lazy(() => import('pages/prediction/Predictions'));

const Login = lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return import('pages/authentication/Login');
});
const SignUp = lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return import('pages/authentication/SignUp');
});
const ResetPassword = lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return import('pages/authentication/ResetPassword');
});

const routes = [
  {
    element: (
      <Suspense fallback={<Splash />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: '',
        element: (
          <MainLayout>
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </MainLayout>
        ),
        children: [
          {
            path: '',
            element: <Sales />,
          },
          {
            path: 'dashboard',
            element: <Dashboard />,
          },
          {
            path: 'prediction',
            element: <Prediction />,
          },
        ],
      },
      {
        path: rootPaths.authRoot,
        element: (
          <AuthLayout>
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </AuthLayout>
        ),
        children: [
          {
            path: paths.login,
            element: <Login />,
          },
          {
            path: paths.signup,
            element: <SignUp />,
          },
          {
            path: paths.resetPassword,
            element: <ResetPassword />,
          },
        ],
      },
      {
        path: '*',
        element: <Error404/>,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
