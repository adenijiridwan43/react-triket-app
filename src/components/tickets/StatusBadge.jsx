import React from 'react';

export default function StatusBadge({ status }) {
  const map = {
    open: 'bg-emerald-100 text-emerald-800',
    in_progress: 'bg-amber-100 text-amber-800',
    closed: 'bg-slate-100 text-slate-700',
  };
  const cls = map[status] || 'bg-gray-100 text-gray-700';
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${cls}`}>
      {status?.replace('_', ' ')}
    </span>
  );
}
