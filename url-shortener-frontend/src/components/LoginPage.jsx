import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import TextField from './TextField';
import api from '../api/api'
import toast from 'react-hot-toast';
import { useStoreContext } from '../contextApi/ContextApi';

const LoginPage = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();


    const { setToken } = useStoreContext();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);

    const registerHandler = async (data) => {
        setLoader(true);
        
        try {
            const { data: response } = await api.post(
                "/api/auth/public/login",
                data
            );

            // store token to local storage
            console.log(response.token)
            setToken(response.token)
            localStorage.setItem("USER_TOKEN", JSON.stringify(response.token))
            toast.success("Login Successful!")

            reset();
            navigate("/dashboard");
            
        } catch (error) {
            console.log(error);
            toast.error("Login Failed!");
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-3xl font-bold text-gray-900">
                    Login
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-600 hover:text-blue-500">
                        Register
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit(registerHandler)} className="space-y-6">
                        <TextField
                            label="Userame"
                            id="username"
                            register={register}
                            errors={errors}
                            required
                            message="Please enter your user name"
                            placeholder="John Doe"
                        />

                        <TextField
                            label="Password"
                            id="password"
                            type="password"
                            register={register}
                            errors={errors}
                            required
                            message="Password must be at least 8 characters"
                            min={8}
                            placeholder="••••••••"
                        />

                        <div>
                            <button
                                disabled={loader}
                                type='submit'
                               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                               >
                                {loader ? "Loading..." : "Login"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;