/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchBlogData } from "../../context/ViewBlog/action";
import { useBlogDispatch } from "../../context/ViewBlog/context";
import { API_ENDPOINT } from "../../config/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

interface BlogData {
  blogTitle: string;
  blogDescription: string;
  location: string;
  date: string;
  blogThumbnail: string;
  likes: number;
}

const ViewBlog = () => {
  const { blogID } = useParams();
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [isLiked, setIsLiked] = useState<boolean>(false); // State to track if the blog is liked
  const [likesCount, setLikesCount] = useState<number>(0); // State to track the number of likes
  const blogDispatch = useBlogDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (blogID !== undefined) {  // Check if blogID is defined
        const data = await fetchBlogData(blogDispatch, blogID);
        setBlogData(data);
        setIsLiked(data.likes > 0);
        setLikesCount(data.likes);
      }
    };

    fetchData();
  }, [blogDispatch, blogID]);

  const handleLikeClick = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/blog/like/${blogID}`, {
        method: "POST",
        credentials: "include",
      });
  
      if (response.ok && blogID !== undefined) {
        // Fetch the updated data after successful like
        const updatedData = await fetchBlogData(blogDispatch, blogID);
  
        // Update local state based on the new data
        setIsLiked(updatedData.likes > 0);
        setLikesCount(updatedData.likes);
      } else if (response.status === 401) {
        // Redirect to sign-in page if user is not signed in
        navigate("/signin");
      } else {
        console.error("Failed to like blog");
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  


  if (!blogData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-2xl bg-white shadow overflow-hidden sm:rounded-lg content-center">
      <div className="px-4 py-5 sm:px-6">
        <h1 className="text-lg leading-6 font-medium text-gray-900">{blogData.blogTitle}</h1>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{blogData.blogDescription}</p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Location</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{blogData.location}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Date</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{blogData.date}</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Blog Thumbnail</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <img src={`data:image/png;base64, ${blogData.blogThumbnail}`} alt="Blog Thumbnail" className="object-cover" />
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Likes</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <button
                onClick={handleLikeClick}
                className={`like-button ${isLiked ? "liked" : ""}`}
              >
                {isLiked ? (
                  <FontAwesomeIcon icon={faHeart} color="red" className="heart-icon" />
                ) : (
                  <FontAwesomeIcon icon={faHeart} className="heart-icon" />
                )}
                ({likesCount})
              </button>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default ViewBlog;