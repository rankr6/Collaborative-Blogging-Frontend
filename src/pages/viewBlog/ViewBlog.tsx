import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchBlogData } from "../../context/ViewBlog/action";
import { useBlogDispatch } from "../../context/ViewBlog/context";
import { API_ENDPOINT } from "../../config/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faShare, faBookmark, faTrash } from "@fortawesome/free-solid-svg-icons";
import Comments from "./Comment";
import { CommentsForm } from "./CommentForm";

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
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(0);
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false);
  const [showSharePopup, setShowSharePopup] = useState<boolean>(false);
  const [shareableLink, setShareableLink] = useState<string>("");
  const [isBlogSaved, setIsBlogSaved] = useState<boolean>(false); // State to track whether the blog is saved
  const [canDelete, setCanDelete] = useState<boolean>(false); // State to determine if user can delete the blog
  const blogDispatch = useBlogDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      if (blogID !== undefined) {
        const data = await fetchBlogData(blogDispatch, blogID);
        setBlogData(data);
        setIsLiked(data.likes > 0);
        setLikesCount(data.likes);
        setCanDelete(data.userID == localStorage.getItem("userID")); // Check if current user is creator
      }
    };

    fetchData();
  }, [blogDispatch, blogID]);
  const handleLikeClick = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/blog/like/${blogID}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.ok && blogID !== undefined) {
        const updatedData = await fetchBlogData(blogDispatch, blogID);
        setIsLiked(updatedData.likes > 0);
        setLikesCount(updatedData.likes);
      } else if (response.status === 401) {
        navigate("/signin");
      } else {
        console.error("Failed to like blog");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleShareClick = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/blog/share/${blogID}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.ok) {
        const data = await response.json();
        const shareableLink = data.shareableLink;
        setShareableLink(shareableLink);
        setShowSharePopup(true);
      } else if (response.status === 401) {
        navigate("/signin");
      } else {
        console.error("Failed to share blog");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/user/saveblog/${blogID}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.ok) {
        setIsBlogSaved(true); // Update the state to indicate that the blog is saved
      } else if (response.status === 401) {
        navigate("/signin");
      } else {
        console.error("Failed to save blog");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const hideCommentForm = () => {
    setShowCommentForm(false);
  };

  const toggleCommentForm = () => {
    setShowCommentForm(!showCommentForm);
  };

  const copyShareableLink = () => {
    navigator.clipboard.writeText(shareableLink);
    console.log("Shareable link copied to clipboard:", shareableLink);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/publisher/blogs/${blogID}/${localStorage.getItem("userID")}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.ok) {
        navigate("/"); // Redirect to homepage or any appropriate route after deletion
      } else if (response.status === 401) {
        navigate("/signin");
      } else {
        console.error("Failed to delete blog");
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
      {canDelete && ( // Show delete button only if user can delete the blog
        <div className="absolute top-0 right-0 p-2">
          <FontAwesomeIcon icon={faTrash} onClick={handleDelete} className="cursor-pointer text-red-600" />
        </div>
      )}
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
            <dt className="text-sm font-medium text-gray-500">Actions</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <button
                onClick={handleLikeClick}
                className={`like-button`}
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  color={isLiked ? "red" : "currentColor"}
                  className="heart-icon"
                />
                {likesCount}
              </button>
              <FontAwesomeIcon
                icon={faComment}
                className="comment-icon ml-2 cursor-pointer"
                onClick={toggleCommentForm}
              />
              <FontAwesomeIcon
                icon={faShare}
                className="share-icon ml-2 cursor-pointer"
                onClick={handleShareClick}
              />
              <FontAwesomeIcon
                icon={faBookmark}
                className={`save-icon ml-2 cursor-pointer ${isBlogSaved ? 'text-blue-500' : ''}`}
                onClick={handleSaveClick}
              />
              {showSharePopup && (
                <div className="share-popup">
                  <input type="text" value={shareableLink} readOnly />
                  <button onClick={copyShareableLink}>Copy</button>
                </div>
              )}

            </dd>
          </div>
          {showCommentForm && (
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <CommentsForm onHideCommentForm={hideCommentForm} />
            </div>
          )}
          <Comments />
        </dl>
      </div>
    </div>
  );
};

export default ViewBlog;
