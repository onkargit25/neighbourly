import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Loader2, ShieldCheck } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { useAuth } from '@/context/AuthContext';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, loginAsSecretary } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!email) e.email = 'Please enter your email address';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Please enter a valid email address';
    if (!password) e.password = 'Please enter your password';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await login(email, password);
      navigate('/app');
    } catch {
      setErrors({ password: 'Invalid email or password' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your NEIGHBOURLY account">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1.5">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className={`input-field pl-10 ${errors.email ? 'border-red-400 focus:ring-red-400' : ''}`}
              aria-invalid={!!errors.email}
            />
          </div>
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          <p className="text-xs text-neutral-400 mt-1">We'll never share your email with anyone.</p>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1.5">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={`input-field pl-10 pr-10 ${errors.password ? 'border-red-400 focus:ring-red-400' : ''}`}
              aria-invalid={!!errors.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={remember}
              onChange={e => setRemember(e.target.checked)}
              className="w-4 h-4 rounded border-neutral-300 text-olive-600 focus:ring-olive-500"
            />
            <span className="text-sm text-neutral-600 dark:text-neutral-400">Remember me</span>
          </label>
          <Link to="/forgot-password" className="text-sm text-olive-700 hover:underline">
            Forgot password?
          </Link>
        </div>

        {/* Submit */}
        <button type="submit" disabled={loading} className="btn-primary w-full text-base py-3 disabled:opacity-60">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign In'}
        </button>

        {/* Demo secretary login */}
        <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800">
          <p className="text-xs text-center text-neutral-400 mb-2">Demo access for hackathon:</p>
          <button
            type="button"
            onClick={() => {
              loginAsSecretary();
              navigate('/secretary');
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-olive-200 text-olive-700 text-sm font-medium hover:bg-olive-50 transition-colors dark:border-olive-800 dark:hover:bg-olive-900/20"
          >
            <ShieldCheck className="w-4 h-4" />
            Continue as Secretary (Demo)
          </button>
        </div>

        <p className="text-center text-sm text-neutral-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-olive-700 font-medium hover:underline">
            Create Account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
