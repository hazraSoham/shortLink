import React from 'react';
import { motion } from 'framer-motion';
import { LoaderCircle } from 'lucide-react';

const Loading = ({ size = 48, color = "#007bff" }) => { // Customizable size and color
  return (
    <div className="flex justify-center items-center h-screen"> {/* Center on screen */}
      <motion.div
        className="relative" // For positioning the percentage
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 500,
          repeat: Infinity,
          ease: "linear", // Smooth rotation
        }}
      >
        <LoaderCircle size={size} color={color} className="animate-spin" /> {/* lucide Loader icon */}

        {/* Optional: Add percentage or loading text */}
        {/* <motion.div
          className="absolute inset-0 flex items-center justify-center text-white font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }} // Fade in after a short delay
        > */}
          {/* You could dynamically update this percentage */}
          {/* {percentage ? `${percentage}%` : "Loading..."}  */}
           {/* Loading... */}
        {/* </motion.div> */}

      </motion.div>
      <p className='ml-5'>Loading... </p>
    </div>
  );
};

export default Loading;