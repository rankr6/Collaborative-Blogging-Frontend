import { Navigate, createBrowserRouter } from "react-router-dom";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Logout from "../pages/logout";
import NotFound from "../pages/Notfound";
import HomePageLayout from "../layouts/homePage";
import CreateBlog from "../pages/createBlog";
import ViewbBlog from "../pages/viewBlog";
import ProtectedRoute from "./ProtectedRoute";
import ViewBlogs from "../pages/blogs";


const router = createBrowserRouter([
  {
    path: "/signin",
    element: (
      <Signin />
    )
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/logout",
    element: <Logout />
  },
  {
    path: "/notfound",
    element: <NotFound />
  },
  {
    path: "createBlog",
    element: (
      <ProtectedRoute>
        <CreateBlog />
      </ProtectedRoute>
    )
  },
  {
    path: "/",
    element: <HomePageLayout />,
    children: [
      {
        path: "blogs/:blogID",
        element: (
          <ViewbBlog />
        )
      },
    ]
  },
  {
    path: "blogs",
    element:
      <ViewBlogs />
  },
  {
    path: "/homePage",
    element: <Navigate to="/" replace />
  }
]);

export default router;
