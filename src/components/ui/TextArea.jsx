// File: src/components/ui/TextArea.jsx
import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

export default function TextArea({ 
  label, 
  error, 
  placeholder,
  className = '',
  required = false,
  helperText,
  maxLength,
  rows = 4,
  showCharCount = false,
  ...props 
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [charCount, setCharCount] = useState(props.value?.length || 0);

  const handleChange = (e) => {
    setCharCount(e.target.value.length);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div className="mb-5">
      {label && (
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <textarea
          rows={rows}
          maxLength={maxLength}
          className={`
            w-full px-4 py-3.5 
            bg-gray-900 
            border-2 rounded-xl
            text-white placeholder-gray-500
            transition-all duration-300
            shadow-lg
            resize-none
            focus:outline-none focus:ring-4
            ${error 
              ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20 bg-red-950/20' 
              : isFocused 
                ? 'border-blue-500 focus:ring-blue-500/20' 
                : 'border-gray-800 hover:border-gray-700'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
          `}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleChange}
          {...props}
        />

        {showCharCount && maxLength && (
          <div className="absolute bottom-3 right-4 text-xs text-gray-500">
            {charCount}/{maxLength}
          </div>
        )}
      </div>

      {error && (
        <div className="mt-2 flex items-start gap-2 text-red-400 text-sm animate-shake">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {helperText && !error && (
        <p className="mt-2 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}