import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider, useAuth } from './lib/authContext';
import ProtectedRoute from './lib/protectedRoute';

import ErrorPage from './error-page';

// User auth pages
import Login from './pages/authentication/login';
import RegisterFinish from './pages/authentication/registeration/register-fin';
import RegisterInfo from './pages/authentication/registeration/register-info';
import ResetInfo from './pages/authentication/reset/reset-info';
import ResetNewPassword from './pages/authentication/reset/reset-newpw';
import ResetFinish from './pages/authentication/reset/reset-fin';

// App pages
import Home from './pages/app/home/home';
import Explore from './pages/app/explore/explore';
import Follower from './pages/app/follower/follower';
import Following from './pages/app/following/following';
import Notification from './pages/app/notification/notification';
import UserProfile from './pages/app/userprofile/user-profile';
import ProfileEdit from './pages/app/userprofile/profile-edit';

import AuthLayout from './pages/authentication/AuthLayout';
import Layout from './pages/app/layout';

import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import UsersList from "./pages/admin/UserList";
import ReportedPosts from "./pages/admin/ReportedPost";

import RecoveryUser from './pages/authentication/recovery';

function AppRoutes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Login /> },
        { path: "register/info", element: <RegisterInfo /> },
        { path: "register/fin", element: <RegisterFinish /> },
        { path: "forgot-password", element: <ResetInfo /> },
        { path: "reset-password", element: <ResetNewPassword /> },
        { path: "reset-password/fin", element: <ResetFinish /> },
        { path: "recovery", element: <RecoveryUser /> },
      ],
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Layout />,
          children: [
            { path: "home", element: <Home /> },
            { path: "explore", element: <Explore /> },
            { path: "follower/:username", element: <Follower /> },
            { path: "following/:username", element: <Following /> },
            { path: "profile/:username", element: <UserProfile /> },
            { path: "profile-edit", element: <ProfileEdit /> },
          ],
        },
        {
          path: "/admin",
          element: <AdminLayout />,
          children: [
            { path: "dashboard", element: <Dashboard /> },
            { path: "users", element: <UsersList /> },
            { path: "reported-posts", element: <ReportedPosts /> },
          ],
        },
      ]
    }

  ]);

  return <RouterProvider router={router} />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}