import AuthUserLayout from "../layout/AuthUserLayout";
import UserLayout from "../layout/UserLayout";
import RequiredAuth from './RequiredAuth'
import { path } from "./path";

import NotFound from '../pages/notFound/NotFound'
import PostNew from '../pages/postNew/PostNew';
import PostHistory from '../pages/postHistory/PostHistory'
import Login from "../pages/login/Login";
import Home from "../pages/Home";

export const routes = [
  {
    path: '/',
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '/user',
    element: <RequiredAuth><AuthUserLayout /></RequiredAuth>,
    children: [
      {
        path: 'post-new',
        element: <PostNew />,
      },
      {
        path: 'post-history',
        element: <PostHistory />,
      },
    ],
  },
  {
    path: path.login,
    element: <Login/>
  },
  {
    path: path.not_found,
    element: <NotFound />
  }
];

export default routes;