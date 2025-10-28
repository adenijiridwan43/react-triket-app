import React, { useState, useEffect } from 'react';
import { useTickets } from '../../store';
import Input from '../ui/Input';
import Select from '../ui/Select';
import {Button} from '../ui/Button';

export default function TicketForm({ ticket, onSuccess, onCancel }) {
  const { createTicket, updateTicket, loading, formErrors } = useTickets();
  
  const [formData, setFormData] = useState({
    title: ticket?.title || '',
    description: ticket?.description || '',
    status: ticket?.status || 'open',
    priority: ticket?.priority || 'medium',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const success = ticket
      ? await updateTicket(ticket.id, formData)
      : await createTicket(formData);
    
    if (success) {
      onSuccess();
    }
  };

  const statusOptions = [
    { value: 'open', label: 'Open' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'closed', label: 'Closed' },
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Title *"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        error={formErrors.title}
        placeholder="Enter ticket title"
      />

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
          rows="4"
          placeholder="Enter ticket description"
        />
        {formErrors.description && (
          <p className="mt-2 text-sm text-red-600">{formErrors.description}</p>
        )}
      </div>

      <Select
        label="Status *"
        value={formData.status}
        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        options={statusOptions}
        error={formErrors.status}
      />

      <Select
        label="Priority"
        value={formData.priority}
        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
        options={priorityOptions}
        error={formErrors.priority}
      />

      <div className="flex gap-3 mt-6">
        <Button type="submit" loading={loading} className="flex-1">
          {ticket ? 'Update Ticket' : 'Create Ticket'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
