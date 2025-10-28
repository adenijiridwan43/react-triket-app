import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import StatCard from '../components/dasboard/StatCard';
import { useTicketStore, useAuth } from '../store';
import QuickActions from '../components/dasboard/QuickActions';

export default function Dashboard() {
  const store = useTicketStore();
  const { user } = useAuth();
  const navigate = useNavigate();
  const stats = store.getStats();

  return (
    <Container className="py-10 w-full">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-xl sm:text-xl md:text-2xl font-extrabold text-white mb-2">
          Welcome back, <span className="text-gradient">{user?.name}</span> 👋
        </h1>
        <p className="text-sm sm:text-base text-muted max-w-xl">
          Quick summary of your tickets and actions to help you stay on top of your work.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
        <StatCard label="Total Tickets" value={stats.total} color="indigo" />
        <StatCard label="Open Tickets" value={stats.open} color="green" />
        <StatCard label="In Progress" value={stats.inProgress} color="amber" />
        <StatCard label="Closed Tickets" value={stats.closed} color="gray" />
      </div>

      {/* Quick actions */}
      <QuickActions />

      {/* Recent Activity */}
      <div className="mt-8 sm:mt-12">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Recent Activity</h2>
        <div className="bg-white/3 rounded-lg p-4 sm:p-6">
          {stats.total === 0 ? (
            <p className="text-muted text-center py-6 sm:py-8">No tickets yet. Create one to get started!</p>
          ) : (
            <p className="text-muted">You have {stats.open} open tickets that need attention.</p>
          )}
        </div>
      </div>
    </Container>
  );
}
