import { BlogProvider } from "../../context/ViewBlog/context"
import ViewBlogs from "../../pages/blogs"
import Appbar from "./Appbar"
import { Outlet } from "react-router-dom"

const HomePageLayout = () => {

  return (
    <>
      <Appbar />
      <main>
        <Outlet />
      </main>
      <div>
        <BlogProvider>
          <ViewBlogs />
        </BlogProvider>
      </div>
    </>
  )
}

export default HomePageLayout
