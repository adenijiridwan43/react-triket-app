import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import {Container} from '../components/layout/Container';
import TicketCard from '../components/tickets/TicketCard';
import Modal from '../components/ui/Modal';
import TicketForm from '../components/tickets/TicketForm';
import { Button } from '../components/ui/Button';
import { useTickets } from '../store';

export default function TicketsPage() {
  const { tickets, deleteTicket, setCurrentTicket, currentTicket } = useTickets();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Auto-open modal when currentTicket is set externally (QuickActions)
  useEffect(() => {
    if (currentTicket) {
      setIsEditing(Boolean(currentTicket && currentTicket.id));
      setIsModalOpen(true);
    }
  }, [currentTicket]);

  const handleCreateClick = () => {
    setCurrentTicket(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditClick = (ticket) => {
    setCurrentTicket(ticket);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (ticketId) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      await deleteTicket(ticketId);
    }
  };

  const handleFormSuccess = () => {
    setIsModalOpen(false);
    setCurrentTicket(null);
  };

  return (
    <Container className="py-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tickets</h1>
          <p className="text-gray-600 mt-1">Manage your tickets</p>
        </div>
        <Button onClick={handleCreateClick}>
          <Plus size={20} />
          Create Ticket
        </Button>
      </div>

      {/* Tickets Grid */}
      {tickets.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-block p-8 bg-gray-100 rounded-full mb-4">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No tickets yet</h3>
          <p className="text-gray-600 mb-6">Create your first ticket to get started</p>
          <Button onClick={handleCreateClick}>
            <Plus size={20} />
            Create Your First Ticket
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? 'Edit Ticket' : 'Create New Ticket'}
      >
        <TicketForm
          ticket={currentTicket}
          onSuccess={handleFormSuccess}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </Container>
  );
}
