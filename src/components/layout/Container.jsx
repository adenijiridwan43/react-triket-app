// File: src/components/layout/Container.jsx
import React from 'react';

export function Container({
  children,
  className = '',
  maxWidth = '7xl',
  noPadding = false,
}) {
  const maxWidths = {
    // required design max-width = 1440px
    '7xl': 'max-w-[1440px]',
    '6xl': 'max-w-[1280px]',
    '5xl': 'max-w-[1024px]',
    full: 'max-w-full',
  };

  return (
    <div
      className={`
        ${maxWidths[maxWidth]}
        w-full
        mx-auto
        ${noPadding ? '' : 'px-4 sm:px-6 lg:px-8'}
        ${className}
      `}
    >
      {children}
    </div>
  );
}