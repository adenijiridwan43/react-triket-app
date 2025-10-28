import React from 'react';
import StatusBadge from './StatusBadge';
import { Pencil, Trash2 } from 'lucide-react';

export default function TicketCard({ ticket, onEdit, onDelete }) {
  return (
    <article className="card-creative flex flex-col h-full">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-white truncate">{ticket.title}</h4>
          {ticket.description && <p className="text-sm text-muted mt-1 line-clamp-3">{ticket.description}</p>}
        </div>
        <div className="ml-3">
          <StatusBadge status={ticket.status} />
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 pt-4 border-t border-white/6">
        <div className="text-xs text-muted">
          {ticket.priority && <span className="mr-2 px-2 py-1 rounded-md bg-white/3">{ticket.priority}</span>}
          <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => onEdit(ticket)} className="p-2 rounded-md hover:bg-white/3 transition">
            <Pencil size={16} />
          </button>
          <button onClick={() => onDelete(ticket.id)} className="p-2 rounded-md text-rose-400 hover:bg-white/3 transition">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
