import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './error-page';
import { Login } from './pages/authentication/login';
import { RegisterCode } from './pages/authentication/registeration/register-code';
import { RegisterFinish } from './pages/authentication/registeration/register-fin';
import { RegisterInfo } from './pages/authentication/registeration/register-info';
import { ResetInfo } from './pages/authentication/reset/reset-info';
import { ResetNewPassword } from './pages/authentication/reset/reset-newpw';
import { ResetFinish } from './pages/authentication/reset/reset-fin';
import Layout from './pages/app/layout';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: "/register/info",
    element: <RegisterInfo />,
  },
  {
    path: "/register/auth",
    element: <RegisterCode />,
  },
  {
    path: "/register/fin",
    element: <RegisterFinish />,
  },
  {
    path: "/reset/info",
    element: <ResetInfo />,
  },
  {
    path: "/reset/newpassword",
    element: <ResetNewPassword />,
  },
  {
    path: "/reset/fin",
    element: <ResetFinish />,
  },
  {
    path:"/",
    element: <Layout />
  }
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}
