import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from './store/store';
import { api } from './student/utils/api';
import {
  LogoIcon,
  StudentRoleIcon,
  FacultyRoleIcon,
  AdminRoleIcon
} from './assets/Icons';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login: storeLogin } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      // The manual api.js returns the full JSON object
      const user = response.data.user;

      // Update store with user info
      storeLogin(user);


      // Redirect based on role
      if (user.role === 'STUDENT') {
        navigate('/student/dashboard');
      } else if (user.role === 'FACULTY') {
        navigate('/faculty/dashboard');
      } else if (user.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }

    } catch (err: any) {
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-900 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-blue-900/20">
            <LogoIcon size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">GMP Portal</h1>
          <p className="text-slate-500 font-medium leading-relaxed">Secure Academic Hub</p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xl">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Email / ID
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10 outline-none transition-all"
                placeholder="student@uni.edu"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-900 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-900/20 hover:bg-blue-800 transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center mt-12 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
          © 2024 University Management System
        </p>
      </div>
    </div>
  );
};
