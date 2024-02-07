import React, { useState } from "react";
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
  const [step, setStep] = useState(1);
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (step === 1) {
      setStep(2);
    } else {
      try {
        const response = await fetch(`${API_ENDPOINT}/users`, {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Sign-up failed");
        }

        const responseData = await response.json();
        console.log(responseData);
        toast.success("Sign-up successful!");

        localStorage.setItem("token", responseData.token);
        localStorage.setItem("userData", JSON.stringify(responseData.user));
        localStorage.setItem("userID", responseData.user.id)
        navigate("/signin");
      } catch (error) {
        console.error("Sign-up failed:", error);
        toast.error("Sign-up failed. Please check your information and try again.");
      }
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <ToastContainer />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          Collaborative Blogging
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {step === 1 && (
                <>
                  <div>
                    <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                    <input type="text" id="firstName" autoFocus {...register("firstName", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First Name" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                    <input type="text" id="lastName" autoFocus {...register("lastName", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last Name" />
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <div>
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                    <input type="text" id="username" autoFocus {...register("username", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="email" id="email" autoFocus {...register("email", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" />
                  </div>
                </>
              )}
              {step === 3 && (
                <>
                  <div>
                    <label htmlFor="mobileNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile Number</label>
                    <input type="tel" id="mobileNumber" autoFocus {...register("mobileNumber", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mobile Number" />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" id="password" autoFocus {...register("password", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" />
                    {errors.password && <span>This field is required</span>}
                  </div>
                </>
              )}
              <div className="flex justify-between">
                {step !== 1 && (
                  <button onClick={prevStep} className="w-1/2 mr-2 text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Previous</button>
                )}
                {step !== 3 ? (
                  <button onClick={nextStep} className="w-1/2 text-blue bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Next</button>
                ) : (
                  <button type="submit" className="w-1/2 text-blue bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                )}
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? <a href="/signin" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupForm;
