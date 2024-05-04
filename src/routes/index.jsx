import AuthUserLayout from "../layout/AuthUserLayout";
import UserLayout from "../layout/UserLayout";
import RequiredAuth from "./RequiredAuth";
import { path } from "./path";

import NotFound from "../pages/notFound/NotFound";
import PostNew from "../pages/postNew/PostNew";
import PostHistory from "../pages/postHistory/PostHistory";
import Login from "../pages/login/Login";
import Home from "../pages/Home";
import Recharge from "../pages/Recharge";
import ServicesTable from "../pages/servicePrice/ServicesTable";
import Register from "../pages/register/register";
import Profile from "../pages/profile/Profile";
import SavePost from "../pages/savePost/SavePost";

export const routes = [
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "services",
        element: <ServicesTable />,
      },
      {
        path: path.default.save_post,
        element: <SavePost></SavePost>,
      },
    ],
  },
  {
    path: "/user",
    element: (
      <RequiredAuth>
        <AuthUserLayout />
      </RequiredAuth>
    ),
    children: [
      {
        path: "post-new",
        element: <PostNew />,
      },
      {
        path: "post-history",
        element: <PostHistory />,
      },
      {
        path: "recharge",
        element: <Recharge />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "history-money",
    element: <Recharge />,
  },
  {
    path: path.login,
    element: <Login />,
  },
  {
    path: path.register,
    element: <Register />,
  },
  {
    path: path.not_found,
    element: <NotFound />,
  },
];

export default routes;
