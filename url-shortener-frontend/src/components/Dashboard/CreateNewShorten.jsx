import React, { useState } from 'react';
import { useStoreContext } from '../../contextApi/ContextApi';
import { useForm } from 'react-hook-form';
import TextField from '../TextField';
import { X } from 'lucide-react';
import api from '../../api/api';
import toast from 'react-hot-toast';

const CreateNewShorten = ({ setOpen, refetch }) => {
    const { token } = useStoreContext();
    const [loader, setLoader] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            url: ""
        },
        mode: 'onTouched'
    });

    const createShortURLHandler = async (data) => {
        console.log(data)
        setLoader(true);
        try {
            const { data: res } = await api.post('/api/urls/shorten', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            // const shortenUrl = `${import.meta.env.VITE_REACT_SUBDOMAIN}/`+`${res.shortUrl}`
            const shortenUrl = `${import.meta.env.VITE_REACT_FRONT_END_URL}/url/${res.shortUrl}`
            navigator.clipboard.writeText(shortenUrl).then(() => {
                toast.success("Short URL Copied to Clipboard", {
                    position: "bottom-center",
                    className: "mb-5",
                    duration: 3000,
                });
            });

            reset();
            setOpen(false);

        } catch (error) {
            toast.error("Create ShortURL Failed");
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 relative">
                <form className="space-y-6" onSubmit={handleSubmit(createShortURLHandler)}>
                    <div className="flex justify-between items-start">
                        <h3 className="text-3xl font-bold text-gray-900">
                            Create Short URL
                        </h3>
                        {!loader && (
                            <button
                                type="button"
                                disabled={loader}
                                onClick={() => setOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                title="Close"
                            >
                                <X className="h-5 w-5 text-gray-500" />
                            </button>
                        )}
                    </div>

                    <TextField
                        label="Enter URL"
                        id="url"
                        type='url'
                        register={register}
                        errors={errors}
                        required
                        message="Please enter your URL"
                        placeholder="https://your.url.com"
                    />

                    <div>
                        <button
                            disabled={loader}
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            {loader ? "Loading..." : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateNewShorten;