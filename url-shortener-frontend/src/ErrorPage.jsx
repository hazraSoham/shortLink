import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const ErrorPage = ({
  message = "Something went wrong",
  statusCode = 500
}) => {

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-6 sm:p-8">
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2
            }}
          >
            <div className="relative">
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                <AlertTriangle size={72} className="text-red-500" strokeWidth={1.5} />
              </motion.div>
              <motion.div
                className="absolute -bottom-1 -right-1 bg-gray-800 text-white text-xs font-bold rounded-full w-10 h-10 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                {statusCode}
              </motion.div>
            </div>
          </motion.div>

          <motion.h1
            className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Oops!
          </motion.h1>

          <motion.p
            className="text-center text-gray-600 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {message}
          </motion.p>

          <NavLink className="flex justify-center text-center text-blue-600 mb-8" to={'/'}>Go to Home Page</NavLink>
        </div>

        <motion.div
          className="px-6 py-4 bg-gray-50 border-t border-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm text-gray-500 text-center">
            If you continue to experience issues, please contact support.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;