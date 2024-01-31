/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { BlogState } from "../../context/ViewBlog/type";
import { useBlogDispatch, useBlogState } from "../../context/ViewBlog/context";
import { fetchBlogs } from "../../context/ViewBlog/action";
import { Link } from "react-router-dom";

const Blogs = () => {
  const state: BlogState = useBlogState();
  const { blogs, isLoading, isError, errorMessage } = state;
  const blogDispatch = useBlogDispatch();

  useEffect(() => {
    const fetchBlogData = async () => {
      fetchBlogs(blogDispatch);
    }
    fetchBlogData();
  }, [blogDispatch]);

  if (isLoading) {
    return <div className="text-left p-4">Loading...</div>;
  }

  if (isError) {
    return <div className="text-left p-4">{errorMessage}</div>;
  }


  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id} className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{blog.location}</div>
              <Link to={`/blogs/${blog.id}`} className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{blog.blogTitle}</Link>
              <p className="mt-2 text-gray-500">{blog.date}</p>
              <p className="mt-2 text-gray-500">Likes: {blog.likes}</p>
            </div>
          </div>
        </div>
      ))}

    </div>
  );
};

export default Blogs;