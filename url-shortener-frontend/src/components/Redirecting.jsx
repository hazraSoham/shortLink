import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const RedirectPage = ({
    redirectUrl = "https://example.com",
    redirectDelay = 5,
    message = "You are being redirected"
}) => {
    const [countdown, setCountdown] = useState(redirectDelay);

    useEffect(() => {
        // Set up countdown timer
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(prev => prev - 1);
            }, 1000);

            return () => clearTimeout(timer);
        } else {
            // Redirect when countdown reaches zero
            window.location.href = redirectUrl;
        }
    }, [countdown, redirectUrl]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden"
            >
                <div className="p-8">
                    <motion.div
                        className="flex justify-center mb-6"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                        <Loader2 size={48} className="text-blue-500" />
                    </motion.div>

                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
                        {message}
                    </h1>

                    <p className="text-center text-gray-600 mb-6">
                        You will be automatically redirected in {countdown} second{countdown !== 1 ? 's' : ''}.
                    </p>

                    <motion.div
                        className="w-full bg-gray-200 h-2 rounded-full overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <motion.div
                            className="bg-blue-500 h-full"
                            initial={{ width: "100%" }}
                            animate={{ width: `${(countdown / redirectDelay) * 100}%` }}
                            transition={{ duration: 1, ease: "linear" }}
                        />
                    </motion.div>

                    <div className="mt-6 text-center">
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={redirectUrl}
                            className="inline-block px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Redirect Now
                        </motion.a>
                    </div>
                </div>

                <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
                    <p className="text-sm text-gray-500 text-center">
                        If you are not redirected automatically, please click the button above.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default RedirectPage;