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
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <ToastContainer />
        <label className="block text-gray-700 text-sm font-bold mb-2" >
          Blog Title:
        </label>
        <input
          type="text"
          {...register("blogTitle", { required: true })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="blogTitle"
          placeholder="Enter blog title"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" >
          Blog Description:
        </label>
        <textarea
          {...register("blogDescription", { required: true })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-20"
          id="blogDescription"
          placeholder="Enter blog description"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" >
          Location:
        </label>
        <input
          type="text"
          {...register("location", { required: true })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="location"
          placeholder="Enter location"
        />
      </div>
      {/* <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">
      Date:
    </label>
    <input
      type="date"
      {...register("date", { required: true })}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="date"
    />
  </div> */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" >
          Blog Thumbnail:
        </label>
        <input
          type="file"
          accept="image/*"
          {...register("blogThumbnail", { required: true })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="blogThumbnail"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Blog
        </button>
      </div>
    </form>

  );
};

export default CreateBlogForm;
