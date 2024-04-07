import { BlogProvider } from "../../context/ViewBlog/context";
import ViewBlogs from "../../pages/blogs";
import Appbar from "./Appbar";
import { Outlet } from "react-router-dom";
import BotpressWebchat from "./chatbot";

const HomePageLayout = () => {
  return (
    <>
      <Appbar />
      <main>
        <Outlet />
      </main>
      <div className="flex justify-center"> {/* Apply flex and justify-center here */}
        <BlogProvider>
          <div>
            <ViewBlogs />
          </div>
          <BotpressWebchat />
        </BlogProvider>
      </div>
    </>
  );
};

export default HomePageLayout;
