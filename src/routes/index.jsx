import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import PostDetail from "../pages/PostDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/post-detail/:id",
    element: <PostDetail />,
  },
]);

export default router;
