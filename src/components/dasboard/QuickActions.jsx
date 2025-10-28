import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, BarChart2, DownloadCloud, Zap } from 'lucide-react';
import { Container } from '../layout/Container';
import { useTickets } from '../../store'; // hook used in TicketsPage
import { useUI } from '../../store'; // optional toast UI if available

export default function QuickActions() {
  const navigate = useNavigate();
  const { createTicket, setCurrentTicket } = useTickets();
  const { setToast } = useUI ? useUI() : { setToast: null }; // safe read if available

  const addDemoTicket = async () => {
    try {
      const demo = {
        title: 'Demo: Urgent UI bug',
        description: 'Illustration ticket created from Quick Actions',
        status: 'open',
        priority: 'High',
        createdAt: new Date().toISOString(),
      };

      // createTicket should return the created ticket (id included)
      const created = await createTicket(demo);

      // set current ticket in store so TicketsPage / TicketList can highlight it
      if (setCurrentTicket && created) setCurrentTicket(created);

      // show lightweight toast if UI store exposes setToast
      if (setToast) {
        setToast({ type: 'success', message: 'Demo ticket created.' });
      }

      // navigate to tickets page and show created ticket
      navigate('/tickets');
    } catch (err) {
      console.error('Failed to add demo ticket', err);
      if (setToast) {
        setToast({ type: 'error', message: 'Failed to create demo ticket.' });
      } else {
        alert('Failed to create demo ticket.');
      }
    }
  };

  const createQuickTicket = async () => {
    // create a minimal, editable ticket immediately and navigate to Tickets
    try {
      const quick = {
        title: 'New ticket',
        description: '',
        status: 'open',
        priority: 'Medium',
        createdAt: new Date().toISOString(),
      };
      const created = await createTicket(quick);
      if (setCurrentTicket && created) setCurrentTicket(created);
      if (setToast) setToast({ type: 'success', message: 'Ticket created — you can edit it now.' });
      navigate('/tickets');
    } catch (err) {
      console.error('Create quick ticket failed', err);
      if (setToast) setToast({ type: 'error', message: 'Failed to create ticket.' });
    }
  };

  return (
    <Container className="mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={createQuickTicket}
          className="group flex flex-col items-start gap-3 p-4 rounded-xl bg-linear-to-br from-indigo-600 to-violet-600 text-white shadow-lg hover:scale-[1.02] transition"
          aria-label="Create new ticket"
        >
          <div className="p-2 bg-white/10 rounded-md">
            <Plus size={20} />
          </div>
          <div>
            <h3 className="text-base font-semibold">Create Ticket</h3>
            <p className="text-sm opacity-85">Create a new ticket instantly</p>
          </div>
        </button>

        <button
          onClick={() => navigate('/tickets')}
          className="group flex flex-col items-start gap-3 p-4 rounded-xl bg-white/5 text-white border border-white/5 hover:bg-white/10 transition"
          aria-label="View tickets"
        >
          <div className="p-2 bg-white/5 rounded-md">
            <BarChart2 size={20} />
          </div>
          <div>
            <h3 className="text-base font-semibold">All Tickets</h3>
            <p className="text-sm opacity-85">Browse and manage tickets</p>
          </div>
        </button>

        <button
          onClick={addDemoTicket}
          className="group flex flex-col items-start gap-3 p-4 rounded-xl bg-emerald-600 text-white shadow hover:bg-emerald-700 transition"
          aria-label="Add demo ticket"
        >
          <div className="p-2 bg-white/10 rounded-md">
            <Zap size={20} />
          </div>
          <div>
            <h3 className="text-base font-semibold">Add Demo</h3>
            <p className="text-sm opacity-85">Create a quick demo ticket</p>
          </div>
        </button>

        <button
          onClick={() => {
            const { exportDemo } = window; // fallback
            // export demo logic kept local if needed
            const data = []; // no-op if none
            const csv = 'id,title';
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'triket-demo-tickets.csv';
            a.click();
            URL.revokeObjectURL(url);
            if (setToast) setToast({ type: 'success', message: 'Export started.' });
          }}
          className="group flex flex-col items-start gap-3 p-4 rounded-xl bg-slate-800 text-white border border-white/5 hover:bg-slate-700 transition"
          aria-label="Export demo tickets"
        >
          <div className="p-2 bg-white/5 rounded-md">
            <DownloadCloud size={20} />
          </div>
          <div>
            <h3 className="text-base font-semibold">Export Demo</h3>
            <p className="text-sm opacity-85">Download demo tickets CSV</p>
          </div>
        </button>
      </div>

      {/* decorative circles */}
      <div aria-hidden className="pointer-events-none">
        <div className="absolute -z-10 right-8 top-20 w-40 h-40 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute -z-10 left-8 top-48 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl" />
      </div>
    </Container>
  );
}