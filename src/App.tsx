import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './error-page';

// User auth pages
import { Login } from './pages/authentication/login';
import { RegisterCode } from './pages/authentication/registeration/register-code';
import { RegisterFinish } from './pages/authentication/registeration/register-fin';
import { RegisterInfo } from './pages/authentication/registeration/register-info';
import { ResetInfo } from './pages/authentication/reset/reset-info';
import { ResetNewPassword } from './pages/authentication/reset/reset-newpw';
import { ResetFinish } from './pages/authentication/reset/reset-fin';

// App pages
import { Home } from './pages/app/home/home';
import { Explore } from './pages/app/explore/explore';
import { Follower } from './pages/app/follower/follower';
import { Notification } from './pages/app/notification/notification';
import { UserProfile } from './pages/app/userprofile/user-profile';
import { ProfileEdit } from './pages/app/userprofile/profile-edit';

import AuthLayout from './pages/authentication/AuthLayout';
import Layout from './pages/app/layout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register/info",
        element: <RegisterInfo />,
      },
      {
        path: "register/auth",
        element: <RegisterCode />,
      },
      {
        path: "register/fin",
        element: <RegisterFinish />,
      },
      {
        path: "reset/info",
        element: <ResetInfo />,
      },
      {
        path: "reset/newpassword",
        element: <ResetNewPassword />,
      },
      {
        path: "reset/fin",
        element: <ResetFinish />,
      },
    ]
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <Home />
      },
      {
        path: "explore",
        element: <Explore />
      },
      {
        path: "follower",
        element: <Follower />
      },
      {
        path: "notification",
        element: <Notification />
      },
      {
        path: "profile",
        element: <UserProfile />
      },
      {
        path: "profile-edit",
        element: <ProfileEdit />,
      },
    ],
  },
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}
