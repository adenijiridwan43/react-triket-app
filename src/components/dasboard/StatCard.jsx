import React from 'react';

export default function StatCard({ label, value = 0, color = 'indigo' }) {
  const colorMap = {
    indigo: { from: 'from-indigo-500', to: 'to-violet-600', text: 'text-indigo-600' },
    green: { from: 'from-emerald-400', to: 'to-green-600', text: 'text-emerald-600' },
    amber: { from: 'from-amber-400', to: 'to-amber-600', text: 'text-amber-600' },
    gray: { from: 'from-slate-400', to: 'to-slate-600', text: 'text-slate-600' },
  };
  const cfg = colorMap[color] || colorMap.indigo;

  return (
    <div className="card-creative flex items-center justify-between gap-4">
      <div className={`shrink-0 rounded-lg p-3 bg-linear-to-br ${cfg.from} ${cfg.to} shadow-md`}>
        <span className="text-lg font-bold">{/* icon slot or value badge */}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className={`text-sm font-semibold ${cfg.text}`}>{label}</h3>
          <div className="text-xl font-extrabold text-white">{value}</div>
        </div>
        <p className="text-xs text-muted mt-1">overview</p>
      </div>
    </div>
  );
}
