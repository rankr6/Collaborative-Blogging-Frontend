import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    password: string;
    username: string;
}

const SigninForm: React.FC = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            const response = await fetch(`${API_ENDPOINT}/session`, {
                method: "POST",
                credentials: 'include',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                console.error("Sign-in failed. Status code:", response.status);
                toast.error("Sign-in failed. Please check your credentials.");
                return;
            }

            const responseData = await response.json();

            if (!responseData || !responseData.token) {
                console.error("Sign-in failed. Invalid response data:", responseData);
                toast.error("Sign-in failed. Invalid response data.");
                return;
            }
            console.log(responseData);

            localStorage.setItem("token", responseData.token);
            localStorage.setItem("firstName", responseData.firstName);
            localStorage.setItem("lastName", responseData.lastName);
            localStorage.setItem("email", responseData.email);
            localStorage.setItem("mobileNumber", responseData.mobileNumber);
            localStorage.setItem("userID", responseData.userID);

            navigate("/");
            toast.success("Sign-in successful!");

        } catch (error) {
            console.error("Sign-in failed:", error);
            toast.error("Sign-in failed. An unexpected error occurred.");
        }
    };



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <ToastContainer />
                <label className="block text-gray-700 font-semibold mb-2">Email:</label>
                <input
                    type="email"
                    id="email"
                    {...register("email", { required: true })}
                    className="w-full border rounded-md py-2 px-3 text-white leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                />
            </div>
            <div>
                <label className="block text-gray-700 font-semibold mb-2">
                    Password:
                </label>
                <input
                    type="password"
                    id="password"
                    {...register("password", { required: true })}
                    className="w-full border rounded-md py-2 px-3 text-white leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
            >
                Sign In
            </button>
        </form>
    );
};

export default SigninForm;