import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Loader2, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '@/components/auth/AuthLayout';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!email) { setError('Please enter your email address'); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError('Please enter a valid email address'); return; }
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setSent(true);
  };

  if (sent) {
    return (
      <AuthLayout title="Check your email" subtitle="We've sent you a password reset link">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 rounded-full bg-olive-50 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-8 h-8 text-olive-600" />
          </div>
          <p className="text-sm text-neutral-500 mb-6">
            We've sent a password reset link to <span className="font-medium text-neutral-900 dark:text-white">{email}</span>. Please check your inbox and follow the instructions.
          </p>
          <Link to="/login" className="btn-secondary">
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </motion.div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Forgot password?" subtitle="Enter your email and we'll send you a reset link">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1.5">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className={`input-field pl-10 ${error ? 'border-red-400' : ''}`}
            />
          </div>
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          <p className="text-xs text-neutral-400 mt-1">You'll receive an email with instructions to reset your password.</p>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full text-base py-3 disabled:opacity-60">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send Reset Link'}
        </button>

        <p className="text-center text-sm text-neutral-500">
          Remember your password?{' '}
          <Link to="/login" className="text-olive-700 font-medium hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
