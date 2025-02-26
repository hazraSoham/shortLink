import React from 'react';

const TextField = ({
  label,
  id,
  type = 'text',
  errors,
  register,
  required = false,
  message = 'This field is required',
  className = '',
  min,
  value,
  placeholder
}) => {
  // Email validation regex
  const emailPattern = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+com+$/;
  
  // URL validation regex
  const urlPattern = /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/[^\s]*)?$/;

  // Get validation rules based on field type
  const getValidationRules = () => {
    const rules = {
      required: required && message,
    };

    // console.log(id, type, min, value);
    if (min) {
      rules.min = {
        value: min,
        message: `Minimum value is ${min}`
      };
    }

    if (type === 'email') {
      rules.pattern = {
        value: emailPattern,
        message: 'Please enter a valid email address'
      };
    }

    if (type === 'url') {
      rules.pattern = {
        value: urlPattern,
        message: 'Please enter a valid URL'
      };
    }

    return rules;
  };

  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label 
          htmlFor={id} 
          className="text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        id={id}
        type={type}
        min={min}
        value={value}
        placeholder={placeholder}
        {...register(id, getValidationRules())}
        className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
          ${errors?.[id] ? 'border-red-500' : 'border-gray-300'}
          ${className}`}
          
      />
      
      {errors?.[id] && (
        <p className="text-sm text-red-500 mt-1">
          {errors[id].message}
        </p>
      )}
    </div>
  );
};

export default TextField;