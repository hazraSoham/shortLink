import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import TextField from './TextField';
import api from '../api/api'
import toast from 'react-hot-toast';

const RegisterPage = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useForm();

    const password = watch('password');
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);

    const delay = async (ms) => {
        return new Promise((resolve) => 
            setTimeout(resolve, ms));
    };

    const registerHandler = async (data) => {
        setLoader(true);
        // console.log(data);
        // await delay(10000);
        
        try {
            const { data: response } = await api.post(
                "/api/auth/public/register",
                data
            );
            reset();
            navigate("/login");
            toast.success("Registeration Successful!")
        } catch (error) {
            console.log(error);
            toast.error("Registeration Failed!")
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-3xl font-bold text-gray-900">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 hover:text-blue-500">
                        Login
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit(registerHandler)} className="space-y-6">
                        <TextField
                            label="UserName"
                            id="username"
                            register={register}
                            errors={errors}
                            required
                            message="Please enter your user name"
                            placeholder="John Doe"
                        />

                        <TextField
                            label="Email Address"
                            id="email"
                            type="email"
                            register={register}
                            errors={errors}
                            required
                            message="Please enter a valid email address"
                            placeholder="you@example.com"
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

                        <TextField
                            label="Confirm Password"
                            id="confirmPassword"
                            type="password"
                            register={register}
                            errors={errors}
                            required
                            message="Passwords must match"
                            placeholder="••••••••"
                            validate={value => value === password || "Passwords do not match"}
                        />

                        <div>
                            <button
                                disabled={loader}
                                type='submit'
                               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                               >
                                {loader ? "Loading..." : "Create Account"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;