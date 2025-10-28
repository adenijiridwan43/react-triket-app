import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import Footer from './components/layout/Footer';
import Toast from './components/ui/Toast';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './store';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import TicketsPage from './pages/TicketsPage';
import NotFound from './pages/NotFound';

function App() {
  const { restoreSession } = useAuth();

  // Restore session on app load
  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  return (
    <div className="flex flex-col min-h-screen w-full bg-black">
      {/* Header - sticky navigation */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 w-full">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tickets" element={<TicketsPage />} />
          </Route>
          
          {/* 404 - Catch all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Toast Notifications */}
      <Toast />
    </div>
  );
}

export default App;