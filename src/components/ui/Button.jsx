// File: src/components/ui/Button.jsx
import React from 'react';

export  function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  loading = false,
  fullWidth = false,
  icon,
  className = '',
  disabled = false,
  ...props 
}) {
  const baseStyles = 'font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white focus:ring-blue-500/50 shadow-blue-500/30 hover:shadow-blue-600/40',
    secondary: 'bg-gray-800 hover:bg-gray-700 text-white border-2 border-gray-700 hover:border-gray-600 focus:ring-gray-600/50 shadow-gray-800/50',
    danger: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white focus:ring-red-500/50 shadow-red-500/30 hover:shadow-red-600/40',
    ghost: 'bg-transparent hover:bg-gray-800/50 text-gray-300 hover:text-white border-2 border-gray-700 hover:border-gray-600 focus:ring-gray-600/50',
    outline: 'bg-transparent hover:bg-blue-600/10 text-blue-500 hover:text-blue-400 border-2 border-blue-600 hover:border-blue-500 focus:ring-blue-500/50',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <>
          <svg 
            className="animate-spin h-5 w-5" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && <span className="shrink-0">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}