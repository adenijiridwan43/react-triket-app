import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store';
import { LogOut, Menu, X } from 'lucide-react';
import { Container } from './Container';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const navLinks = isAuthenticated ? (
    <>
      <Link 
        to="/dashboard" 
        className="text-white hover:text-indigo-600 transition"
        onClick={() => setIsMenuOpen(false)}
      >
        Dashboard
      </Link>
      <Link 
        to="/tickets" 
        className="text-white hover:text-indigo-600 transition"
        onClick={() => setIsMenuOpen(false)}
      >
        Tickets
      </Link>
      <span className="text-sm text-white">Hi, {user?.name}!</span>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-red-600 hover:text-red-700 transition"
      >
        <LogOut size={18} />
        Logout
      </button>
    </>
  ) : (
    <>
      <Link 
        to="/auth/login" 
        className="text-white hover:text-indigo-600 transition"
        onClick={() => setIsMenuOpen(false)}
      >
        Login
      </Link>
      <Link
        to="/auth/signup"
        className="bg-indigo-600 text-white  px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        onClick={() => setIsMenuOpen(false)}
      >
        Sign Up
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-40 bg-transparent">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl md:text-2xl font-bold text-indigo-400">
            Triket
          </Link>

          <button
            className="md:hidden p-2 text-gray-200 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks}
          </nav>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col items-start gap-4">
              {navLinks}
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}
