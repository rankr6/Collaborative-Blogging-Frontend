import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { API_ENDPOINT } from "../../config/constants";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";


type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  password: string;
  username: string;
};

const SignupForm: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { firstName, lastName, email, mobileNumber, password, username } = data;

    try {
      const response = await fetch(`${API_ENDPOINT}/users`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          mobileNumber: mobileNumber,
          password: password,
          username: username
        }),
      });

      if (!response.ok) {
        throw new Error("Sign-up failed");
      }

      const responseData = await response.json();
      console.log(responseData);
      toast.success("Sign-up successful!");

      localStorage.setItem("token", responseData.token);
      localStorage.setItem("userData", JSON.stringify(responseData.user));
      localStorage.setItem("userID",responseData.user.id)
      navigate("/");
    } catch (error) {
      console.error("Sign-up failed:", error);
      toast.error("Sign-up failed. Please check your information and try again.");
    }
  };



  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <ToastContainer />
        <label className="block text-gray-700 font-semibold mb-2">
          First Name:
        </label>
        <input
          type="text"
          id="firstName"
          autoFocus
          {...register("firstName", { required: true })}
          className="w-full border rounded-md py-2 px-3 text-white leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Last Name:
        </label>
        <input
          type="text"
          id="lastName"
          autoFocus
          {...register("lastName", { required: true })}
          className="w-full border rounded-md py-2 px-3 text-white leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Email:</label>
        <input
          type="email"
          id="userEmail"
          autoFocus
          {...register("email", { required: true })}
          className="w-full border rounded-md py-2 px-3 text-white leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Mobile Number:</label>
        <input
          type="tel"
          id="userMobile"
          autoFocus
          {...register("mobileNumber", { required: true })}
          className="w-full border rounded-md py-2 px-3 text-white leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Password:
        </label>
        <input
          type="password"
          id="userPassword"
          autoFocus
          {...register("password", { required: true })}
          className="w-full border rounded-md py-2 px-3 text-white leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        />
        {errors.password && <span>This field is required</span>}
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">User Name:</label>
        <input
          type="text"
          id="username"
          autoFocus
          {...register("username", { required: true })}
          className="w-full border rounded-md py-2 px-3 text-white leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
      >
        Sign up
      </button>
    </form>
  );
};

export default SignupForm;
