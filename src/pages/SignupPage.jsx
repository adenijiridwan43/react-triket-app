import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, useUI } from '../store';
import Input from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup, loading, formErrors, isAuthenticated } = useAuth();
  const { toast, clearToast } = useUI();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Auto-clear toast after 3 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => clearToast(), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast, clearToast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      // simple client-side check - you can set formErrors in your store if desired
      return;
    }

    const success = await signup(formData.email, formData.password, formData.name);
    if (success) navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 to-indigo-900 px-4">
      <div className="max-w-md w-full">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-400 mb-2">Triket</h1>
          <p className="text-gray-300">Create an account to start managing your tickets</p>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create Account</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${formErrors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                placeholder="John Doe"
                disabled={loading}
                required
              />
              {formErrors.name && <p className="mt-2 text-sm text-red-600">{formErrors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${formErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                placeholder="you@example.com"
                disabled={loading}
                required
              />
              {formErrors.email && <p className="mt-2 text-sm text-red-600">{formErrors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${formErrors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                placeholder="••••••••"
                disabled={loading}
                required
              />
              {formErrors.password && <p className="mt-2 text-sm text-red-600">{formErrors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition border-gray-300"
                placeholder="••••••••"
                disabled={loading}
                required
              />
              {formErrors.confirmPassword && <p className="mt-2 text-sm text-red-600">{formErrors.confirmPassword}</p>}
            </div>

            {/* Submit */}
            <Button type="submit" loading={loading} className="w-full">
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          {/* Sign-in link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">Sign in</Link>
          </p>
        </div>

        {/* Demo / Info */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800 font-medium mb-1">💡 Demo</p>
          <p className="text-xs text-blue-700">This app uses mock auth — use any credentials to sign up / sign in.</p>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 max-w-sm w-full bg-white rounded-lg shadow-lg p-4 transition-transform transform ${toast ? 'translate-y-0' : 'translate-y-full'}`}>
          <p className="text-sm text-gray-800">{toast}</p>
        </div>
      )}
    </div>
  );
}