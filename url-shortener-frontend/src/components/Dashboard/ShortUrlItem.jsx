import React, { useEffect, useState } from 'react';
import { Copy, Eye, BarChart2, CalendarDays, ExternalLink, Hourglass } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../../api/api';
import { useStoreContext } from '../../contextApi/ContextApi';
import Graph from './Graph';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const ShortUrlAnalytics = ({ url }) => {

    const baseUrl = `${import.meta.env.VITE_REACT_SUBDOMAIN}/`;
    const { token } = useStoreContext();
    const [analyticsToggle, setAnalyticsToggle] = useState(false);
    const [analyticsData, setAnalyticsData] = useState([]);
    const [selectedUrl, setSelectedUrl] = useState("");
    const [loader, setLoader] = useState(false);


    // Format date to be more readable
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Copy short URL to clipboard
    const copyToClipboard = (shortUrl) => {
        const fullUrl = `${baseUrl}${shortUrl}`;
        navigator.clipboard.writeText(fullUrl);
        toast.success('Copied to clipboard', {
            duration: 2000,
            position: 'top-center',
            style: {
                border: '1px solid #ccc',
                padding: '16px',
                color: '#333',
            },
            iconTheme: {
                primary: '#28a745', // Green color (adjust as needed)
                secondary: '#fff',   // Background color of the icon circle (usually white)
            },
        });
    };

    const fetchMyShortUrl = async () => {
        setLoader(true);
        try {
            const { data } = await api.get(`/api/urls/analytics/${selectedUrl}?startDate=2024-12-01T00:00:00&endDate=2025-12-31T23:59:59`, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            });
            setAnalyticsData(data);
            setSelectedUrl("");
            console.log(data);

        } catch (error) {
            navigate("/error");
            console.log(error);
        } finally {
            setLoader(false);
        }
    }

    const urlAnalyticsHandler = (shortUrl) => {
        if (!analyticsToggle) {
            setSelectedUrl(shortUrl);
        }
        setAnalyticsToggle(!analyticsToggle);
    }

    useEffect(() => {
        if (selectedUrl) {
            fetchMyShortUrl()
        }
    }, [selectedUrl])

    return (
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200 my-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                {/* URL Info */}
                <div className="mb-3 sm:mb-0">

                    <div className="items-center text-sm mt-1 text-blue-600">
                        <Link
                            target='_'
                            className="flex text-lg font-medium "
                            to={import.meta.env.VITE_REACT_SUBDOMAIN + "/" + `${url.shortUrl}`}>
                            {baseUrl + url.shortUrl}
                            <ExternalLink className="h-6 w-4 ml-1 stroke-current" />
                        </Link>
                    </div>

                    <p className="text-sm text-gray-500 truncate max-w-md">{url.originalUrl}</p>

                    {/* Stats - Mobile: vertical, Desktop: horizontal */}
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                        <div className="flex items-center mr-4">
                            <CalendarDays className="h-4 w-4 mr-1 stroke-current" />
                            {formatDate(url.createdDate)}
                        </div>
                        <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1 stroke-current" />
                            {url.clickCount} clicks
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                    <button
                        onClick={() => copyToClipboard(url.shortUrl)}
                        className="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center"
                    >
                        <Copy className="h-4 w-4 mr-2 stroke-current" />
                        Copy
                    </button>
                    <button
                        className="flex-1 sm:flex-none bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center"
                        onClick={() => urlAnalyticsHandler(url.shortUrl)}>
                        <BarChart2 className="h-4 w-4 mr-2 stroke-current" />
                        Stats
                    </button>
                </div>
            </div>
            <React.Fragment>
                <div className={`${analyticsToggle ? "flex" : "hidden"
                    }  max-h-96 sm:mt-0 mt-5 min-h-96 relative  border-t-2 w-[100%] overflow-hidden `}>
                    {loader ? (
                        <div className="min-h-[calc(450px-140px)] flex justify-center items-center w-full mt-3">
                            <div className="flex flex-col items-center gap-1">
                                <motion.div
                                    animate={{ rotate: 360 }} // Rotates 360 degrees
                                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }} // Continuous loop
                                >
                                    <Hourglass size={48} strokeWidth={2} />
                                </motion.div>
                                <p className='text-slate-700'>Please Wait...</p>
                            </div>
                        </div>
                    ) : (
                        <>{analyticsData.length === 0 && (
                            <div className="absolute flex flex-col  justify-center sm:items-center items-end  w-full left-0 top-0 bottom-0 right-0 m-auto">
                                <h1 className=" text-slate-800 font-serif sm:text-2xl text-[15px] font-bold mb-1">
                                    No Data For This Time Period
                                </h1>
                                <h3 className="sm:w-96 w-[90%] sm:ml-0 pl-6 text-center sm:text-lg text-[12px] text-slate-600 ">
                                    Share your short link to view where your engagements are
                                    coming from
                                </h3>
                            </div>
                        )}
                            <Graph graphData={analyticsData} />
                        </>
                    )}
                </div>
            </React.Fragment>
        </div>
    )
}

export default ShortUrlAnalytics