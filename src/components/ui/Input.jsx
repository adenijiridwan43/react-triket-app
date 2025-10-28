import React from 'react';

export default function Input({
  id,
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error,
  disabled = false,
  className = '',
  ...props
}) {
  const base = 'w-full px-4 py-3 rounded-lg border transition focus:outline-none focus:ring-2';
  const normal = 'bg-white text-[#0f1724] placeholder-gray-400 border-gray-200 focus:ring-indigo-500';
  const errorCls = 'border-rose-500 bg-rose-50 text-[#0f1724] focus:ring-rose-400';
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label htmlFor={id || name} className="text-sm font-medium text-[#0f1724] mb-2">
          {label}
        </label>
      )}
      <input
        id={id || name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`${base} ${error ? errorCls : normal}`}
        {...props}
      />
      {error && <p className="text-xs mt-2 text-rose-600">{error}</p>}
    </div>
  );
}