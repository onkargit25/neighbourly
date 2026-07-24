import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, Eye, EyeOff, Loader2, Check } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { useAuth } from '@/context/AuthContext';

export function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', mobile: '', password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name) e.name = 'Please enter your full name';
    if (!form.email) e.email = 'Please enter your email address';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email address';
    if (!form.mobile) e.mobile = 'Please enter your mobile number';
    else if (!/^\d{10}$/.test(form.mobile)) e.mobile = 'Please enter a valid 10-digit mobile number';
    if (!form.password) e.password = 'Please enter a password';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (form.confirm !== form.password) e.confirm = 'Passwords do not match';
    if (!acceptTerms) e.terms = 'Please accept the terms to continue';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/profile-setup');
    } finally {
      setLoading(false);
    }
  };

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  return (
    <AuthLayout title="Create your account" subtitle="Join your community in minutes">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-1.5">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              value={form.name}
              onChange={e => set('name', e.target.value)}
              placeholder="Enter your full name"
              className={`input-field pl-10 ${errors.name ? 'border-red-400' : ''}`}
            />
          </div>
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1.5">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="email"
              value={form.email}
              onChange={e => set('email', e.target.value)}
              placeholder="Enter your email address"
              className={`input-field pl-10 ${errors.email ? 'border-red-400' : ''}`}
            />
          </div>
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>

        {/* Mobile */}
        <div>
          <label className="block text-sm font-medium mb-1.5">Mobile Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="tel"
              value={form.mobile}
              onChange={e => set('mobile', e.target.value)}
              placeholder="Enter your mobile number"
              className={`input-field pl-10 ${errors.mobile ? 'border-red-400' : ''}`}
            />
          </div>
          {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}
        </div>

        {/* Password */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={e => set('password', e.target.value)}
                placeholder="Min 6 characters"
                className={`input-field pl-10 pr-9 ${errors.password ? 'border-red-400' : ''}`}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Confirm</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.confirm}
                onChange={e => set('confirm', e.target.value)}
                placeholder="Re-enter password"
                className={`input-field pl-10 ${errors.confirm ? 'border-red-400' : ''}`}
              />
            </div>
            {errors.confirm && <p className="text-xs text-red-500 mt-1">{errors.confirm}</p>}
          </div>
        </div>

        {/* Terms */}
        <div>
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={e => setAcceptTerms(e.target.checked)}
              className="w-4 h-4 mt-0.5 rounded border-neutral-300 text-olive-600 focus:ring-olive-500"
            />
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              I accept the <a href="#" className="text-olive-700 hover:underline">Terms of Service</a> and <a href="#" className="text-olive-700 hover:underline">Privacy Policy</a>
            </span>
          </label>
          {errors.terms && <p className="text-xs text-red-500 mt-1">{errors.terms}</p>}
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full text-base py-3 disabled:opacity-60">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Account'}
        </button>

        <p className="text-center text-sm text-neutral-500">
          Already have an account?{' '}
          <Link to="/login" className="text-olive-700 font-medium hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
