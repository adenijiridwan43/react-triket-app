import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Mock initial tickets data
const mockTickets = [
  {
    id: '1',
    title: 'Fix login bug',
    description: 'Users cannot log in with correct credentials',
    status: 'open',
    priority: 'high',
    createdAt: new Date('2025-10-20').toISOString(),
    updatedAt: new Date('2025-10-20').toISOString(),
  },
  {
    id: '2',
    title: 'Update dashboard UI',
    description: 'Redesign dashboard with modern components',
    status: 'in_progress',
    priority: 'medium',
    createdAt: new Date('2025-10-21').toISOString(),
    updatedAt: new Date('2025-10-22').toISOString(),
  },
  {
    id: '3',
    title: 'Add email notifications',
    description: 'Send email when ticket status changes',
    status: 'closed',
    priority: 'low',
    createdAt: new Date('2025-10-18').toISOString(),
    updatedAt: new Date('2025-10-23').toISOString(),
  },
];

// Utility function to generate unique IDs
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Validation utilities
const validateTicket = (ticket) => {
  const errors = {};

  // Title validation (required)
  if (!ticket.title || ticket.title.trim() === '') {
    errors.title = 'Title is required';
  } else if (ticket.title.length > 100) {
    errors.title = 'Title must be less than 100 characters';
  }

  // Status validation (required and must be valid enum)
  const validStatuses = ['open', 'in_progress', 'closed'];
  if (!ticket.status) {
    errors.status = 'Status is required';
  } else if (!validStatuses.includes(ticket.status)) {
    errors.status = 'Status must be one of: open, in_progress, closed';
  }

  // Optional fields validation
  if (ticket.description && ticket.description.length > 500) {
    errors.description = 'Description must be less than 500 characters';
  }

  if (ticket.priority && !['low', 'medium', 'high'].includes(ticket.priority)) {
    errors.priority = 'Priority must be one of: low, medium, high';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Auth validation
const validateAuth = (email, password, isSignup = false) => {
  const errors = {};

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Password validation
  if (!password || password.trim() === '') {
    errors.password = 'Password is required';
  } else if (isSignup && password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Main store
export const useTicketStore = create(
  persist(
    (set, get) => ({
      // ============ AUTH STATE ============
      user: null,
      isAuthenticated: false,
      authToken: null,

      // ============ TICKETS STATE ============
      tickets: mockTickets,
      currentTicket: null,

      // ============ UI STATE ============
      loading: false,
      error: null,
      toast: null, // { type: 'success' | 'error' | 'info', message: string }
      formErrors: {},

      // ============ STATISTICS (COMPUTED) ============
      getStats: () => {
        const tickets = get().tickets;
        return {
          total: tickets.length,
          open: tickets.filter((t) => t.status === 'open').length,
          inProgress: tickets.filter((t) => t.status === 'in_progress').length,
          closed: tickets.filter((t) => t.status === 'closed').length,
        };
      },

      // ============ AUTH ACTIONS ============
      login: async (email, password) => {
        set({ loading: true, error: null, formErrors: {} });

        // Validate input
        const validation = validateAuth(email, password);
        if (!validation.isValid) {
          set({
            loading: false,
            formErrors: validation.errors,
            toast: {
              type: 'error',
              message: 'Please fix the errors in the form',
            },
          });
          return false;
        }

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mock authentication - accept any email/password combo for demo
        // In real app, this would be an API call
        const mockUser = {
          id: generateId(),
          email: email,
          name: email.split('@')[0],
        };

        const mockToken = `token_${generateId()}`;

        // Store in localStorage separately for easy access
        localStorage.setItem(
          'ticketapp_session',
          JSON.stringify({
            token: mockToken,
            user: mockUser,
          })
        );

        set({
          user: mockUser,
          isAuthenticated: true,
          authToken: mockToken,
          loading: false,
          toast: {
            type: 'success',
            message: `Welcome back, ${mockUser.name}!`,
          },
        });

        return true;
      },

      signup: async (email, password, name) => {
        set({ loading: true, error: null, formErrors: {} });

        // Validate input
        const validation = validateAuth(email, password, true);
        if (!validation.isValid) {
          set({
            loading: false,
            formErrors: validation.errors,
            toast: {
              type: 'error',
              message: 'Please fix the errors in the form',
            },
          });
          return false;
        }

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        const mockUser = {
          id: generateId(),
          email: email,
          name: name || email.split('@')[0],
        };

        const mockToken = `token_${generateId()}`;

        localStorage.setItem(
          'ticketapp_session',
          JSON.stringify({
            token: mockToken,
            user: mockUser,
          })
        );

        set({
          user: mockUser,
          isAuthenticated: true,
          authToken: mockToken,
          loading: false,
          toast: {
            type: 'success',
            message: `Account created successfully! Welcome, ${mockUser.name}!`,
          },
        });

        return true;
      },

      logout: () => {
        localStorage.removeItem('ticketapp_session');
        set({
          user: null,
          isAuthenticated: false,
          authToken: null,
          tickets: mockTickets, // Reset to mock data
          currentTicket: null,
          toast: {
            type: 'info',
            message: 'You have been logged out',
          },
        });
      },

      // Restore session from localStorage
      restoreSession: () => {
        try {
          const session = localStorage.getItem('ticketapp_session');
          if (session) {
            const { token, user } = JSON.parse(session);
            set({
              user,
              isAuthenticated: true,
              authToken: token,
            });
            return true;
          }
        } catch (error) {
          console.error('Failed to restore session:', error);
          localStorage.removeItem('ticketapp_session');
        }
        return false;
      },

      // ============ TICKET CRUD ACTIONS ============
      createTicket: async (ticketData) => {
        set({ loading: true, error: null, formErrors: {} });

        // Validate ticket
        const validation = validateTicket(ticketData);
        if (!validation.isValid) {
          set({
            loading: false,
            formErrors: validation.errors,
            toast: {
              type: 'error',
              message: 'Please fix the errors in the form',
            },
          });
          return false;
        }

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const newTicket = {
          ...ticketData,
          id: generateId(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          tickets: [newTicket, ...state.tickets], // add newest first
          loading: false,
          formErrors: {},
          toast: {
            type: 'success',
            message: 'Ticket created successfully!',
          },
        }));

        // Return created ticket object (not just true)
        return newTicket;
      },

      updateTicket: async (ticketId, updatedData) => {
        set({ loading: true, error: null, formErrors: {} });

        // Validate ticket
        const validation = validateTicket(updatedData);
        if (!validation.isValid) {
          set({
            loading: false,
            formErrors: validation.errors,
            toast: {
              type: 'error',
              message: 'Please fix the errors in the form',
            },
          });
          return false;
        }

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        let updatedTicket = null;
        set((state) => {
          const tickets = state.tickets.map((ticket) =>
            ticket.id === ticketId
              ? (updatedTicket = { ...ticket, ...updatedData, updatedAt: new Date().toISOString() })
              : ticket
          );
          return {
            tickets,
            loading: false,
            formErrors: {},
            currentTicket: null,
            toast: {
              type: 'success',
              message: 'Ticket updated successfully!',
            },
          };
        });

        // Return updated ticket object
        return updatedTicket;
      },

      deleteTicket: async (ticketId) => {
        set({ loading: true, error: null });

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        set((state) => ({
          tickets: state.tickets.filter((ticket) => ticket.id !== ticketId),
          loading: false,
          toast: {
            type: 'success',
            message: 'Ticket deleted successfully!',
          },
        }));

        return true;
      },

      setCurrentTicket: (ticket) => {
        set({ currentTicket: ticket, formErrors: {} });
      },

      // ============ UI ACTIONS ============
      clearToast: () => {
        set({ toast: null });
      },

      clearFormErrors: () => {
        set({ formErrors: {} });
      },

      setError: (error) => {
        set({
          error,
          toast: {
            type: 'error',
            message: error,
          },
        });
      },

      clearError: () => {
        set({ error: null });
      },

      // ============ NETWORK ERROR SIMULATION ============
      simulateNetworkError: () => {
        set({
          error: 'Failed to load tickets. Please retry.',
          toast: {
            type: 'error',
            message: 'Network error occurred. Please check your connection.',
          },
        });
      },

      // ============ SESSION EXPIRY SIMULATION ============
      handleSessionExpiry: () => {
        localStorage.removeItem('ticketapp_session');
        set({
          user: null,
          isAuthenticated: false,
          authToken: null,
          toast: {
            type: 'error',
            message: 'Your session has expired — please log in again.',
          },
        });
      },
    }),
    {
      name: 'ticket-store', // localStorage key
      partialize: (state) => ({
        // Only persist these fields
        tickets: state.tickets,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        authToken: state.authToken,
      }),
    }
  )
);

// Export helper hooks for common operations
export const useAuth = () => {
  const store = useTicketStore();
  return {
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    login: store.login,
    signup: store.signup,
    logout: store.logout,
    restoreSession: store.restoreSession,
    loading: store.loading,
    formErrors: store.formErrors,
  };
};

export const useTickets = () => {
  const store = useTicketStore();
  return {
    tickets: store.tickets,
    currentTicket: store.currentTicket,
    createTicket: store.createTicket,
    updateTicket: store.updateTicket,
    deleteTicket: store.deleteTicket,
    setCurrentTicket: store.setCurrentTicket,
    loading: store.loading,
    formErrors: store.formErrors,
  };
};

export const useUI = () => {
  const store = useTicketStore();
  return {
    toast: store.toast,
    error: store.error,
    loading: store.loading,
    clearToast: store.clearToast,
    clearError: store.clearError,
    setError: store.setError,
  };
};