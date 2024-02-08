import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormValues {
  blogTitle: string;
  blogDescription: string;
  location: string;
  date: string;
  blogThumbnail: FileList;
}

const CreateBlogForm: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormValues>();
  const token = localStorage.getItem("token") ?? "";
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("blogTitle", data.blogTitle);
      formData.append("blogDescription", data.blogDescription);
      formData.append("location", data.location);
      formData.append("date", data.date);
      formData.append("blogThumbnail", data.blogThumbnail[0]);


      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`);

      const response = await fetch(`${API_ENDPOINT}/publisher/createBlog`, {
        method: "POST",
        credentials: 'include',
        headers: headers,
        body: formData
      });

      console.log('Request Headers:', headers);

      if (!response.ok) {
        console.error("Create blog failed. Status code:", response.status);
        console.error("Response Headers:", response.headers);
        toast.error("Create blog failed. Please try again.");
        return;
      }


      const responseData = await response.json();
      console.log(responseData);


      if (!responseData || !responseData.id) {
        console.error("Create blog failed. Invalid response data:", responseData);
        toast.error("Create blog failed. Invalid response data.");
        return;
      }
      // Redirect to the created blog or any other page
      navigate(`/`);
      toast.success("Blog created successfully!");
    } catch (error) {
      console.error("Create blog failed:", error);
      toast.error("Create blog failed. An unexpected error occurred.");
    }
  };

  return (
    <div className="py-12">
      <ToastContainer />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200">
            <form  onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="blogTitle" className="block text-lg font-semibold text-gray-700">Title</label>
                <input type="text"
                  {...register("blogTitle", { required: true })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  id="blogTitle"
                  placeholder="Enter blog title"
                />
              </div>
              <div>
                <label htmlFor="blogDescription" className="block text-lg font-semibold text-gray-700">Description</label>
                <textarea
                  {...register("blogDescription", { required: true })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  id="blogDescription"
                  placeholder="Enter blog description"
                ></textarea>
              </div>
              <div>
                <label htmlFor="location" className="block text-lg font-semibold text-gray-700">Location</label>
                <input
                  type="text"
                  {...register("location", { required: true })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  id="location"
                  placeholder="Enter location"
                />
              </div>
              <div>
                <label htmlFor="blogThumbnail" className="block text-lg font-semibold text-gray-700">Thumbnail</label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("blogThumbnail", { required: true })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  id="blogThumbnail"
                />
              </div>
              <div className="flex justify-center">
                <button type="submit" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Create Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
};

export default CreateBlogForm;
