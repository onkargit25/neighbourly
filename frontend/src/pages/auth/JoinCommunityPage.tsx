import Logo from "@/assets/logos/logo.png";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, ArrowRight, Building2, MapPin, Loader2, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export function JoinCommunityPage() {
  const [mode, setMode] = useState<'choose' | 'join' | 'create'>('choose');
  const navigate = useNavigate();
  const { login } = useAuth();

  return (
    <div className="min-h-screen bg-neutral-50/50 dark:bg-neutral-950 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl">
        <div className="flex justify-center mb-6">
    <img
    src={Logo}
    alt="Neighbourly Logo"
     className="h-14 w-auto"
    />
    </div>

        <AnimatePresence mode="wait">
          {mode === 'choose' && (
            <motion.div
              key="choose"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h1 className="font-serif text-3xl text-center mb-2">Join Your Community</h1>
              <p className="text-sm text-neutral-500 text-center mb-8">Choose an option to get started</p>

              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={() => setMode('join')}
                  className="card-hover text-left p-6 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-olive-50 flex items-center justify-center text-olive-700 mb-4">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg mb-1">Join Existing Community</h3>
                  <p className="text-sm text-neutral-500 mb-4">Have a community code from your secretary?</p>
                  <span className="text-sm text-olive-700 font-medium flex items-center gap-1">
                    Enter code <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                <button
                  onClick={() => setMode('create')}
                  className="card-hover text-left p-6 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-olive-50 flex items-center justify-center text-olive-700 mb-4">
                    <Plus className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg mb-1">Create New Community</h3>
                  <p className="text-sm text-neutral-500 mb-4">Be the first to add your community</p>
                  <span className="text-sm text-olive-700 font-medium flex items-center gap-1">
                    Get started <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </motion.div>
          )}

          {mode === 'join' && (
            <JoinForm onBack={() => setMode('choose')} onJoin={async () => { await login('demo@neighbourly.in', 'demo'); navigate('/app'); }} />
          )}

          {mode === 'create' && (
            <CreateForm onBack={() => setMode('choose')} onCreate={async () => { await login('demo@neighbourly.in', 'demo'); navigate('/secretary'); }} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function JoinForm({ onBack, onJoin }: { onBack: () => void; onJoin: () => void }) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!code) return;

  setLoading(true);

  await new Promise((r) => setTimeout(r, 800));

  localStorage.setItem(
    "community",
    JSON.stringify({
      name: "Green Valley Residency",
      apartment: "Apartment 4B",
      code,
    })
  );

  setLoading(false);

  onJoin();
};

  return (
    <motion.div key="join" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      <button onClick={onBack} className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white mb-4 flex items-center gap-1">
        ← Back
      </button>
      <h1 className="font-serif text-3xl mb-2">Join Existing Community</h1>
      <p className="text-sm text-neutral-500 mb-6">Enter the community code provided by your secretary.</p>

      <form onSubmit={handleSubmit} className="card p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Community Code</label>
          <input
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder="Enter your community code"
            className="input-field text-center text-lg tracking-widest uppercase"
            maxLength={10}
          />
          <p className="text-xs text-neutral-400 mt-1">Ask your secretary if you don't have a code.</p>
        </div>
        <button type="submit" disabled={loading || !code} className="btn-primary w-full text-base py-3 disabled:opacity-60">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Request to Join'}
        </button>
      </form>
    </motion.div>
  );
}

function CreateForm({ onBack, onCreate }: { onBack: () => void; onCreate: () => void }) {
  const [form, setForm] = useState({ name: '', type: 'apartment', city: '', state: '' });
  const [applySecretary, setApplySecretary] = useState(true);
  const [loading, setLoading] = useState(false);

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!form.name || !form.city || !form.state) return;

  setLoading(true);

  await new Promise((r) => setTimeout(r, 800));

  localStorage.setItem(
    "community",
    JSON.stringify({
      name: form.name,
      type: form.type,
      city: form.city,
      state: form.state,
      secretary: applySecretary,
    })
  );

  setLoading(false);

  onCreate();
};

  return (
    <motion.div key="create" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      <button onClick={onBack} className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white mb-4 flex items-center gap-1">
        ← Back
      </button>
      <h1 className="font-serif text-3xl mb-2">Create New Community</h1>
      <p className="text-sm text-neutral-500 mb-6">Add your residential community to NEIGHBOURLY.</p>

      <form onSubmit={handleSubmit} className="card p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Community Name</label>
          <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Enter your community name" className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Community Type</label>
          <select value={form.type} onChange={e => set('type', e.target.value)} className="input-field">
            <option value="apartment">Apartment</option>
            <option value="society">Housing Society</option>
            <option value="gated">Gated Community</option>
            <option value="colony">Residential Colony</option>
            <option value="hostel">Student Hostel</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1.5">City</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input value={form.city} onChange={e => set('city', e.target.value)} placeholder="Enter city" className="input-field pl-10" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">State</label>
            <input value={form.state} onChange={e => set('state', e.target.value)} placeholder="Enter state" className="input-field" />
          </div>
        </div>
        <label className="flex items-center gap-2 cursor-pointer pt-2">
          <input type="checkbox" checked={applySecretary} onChange={e => setApplySecretary(e.target.checked)} className="w-4 h-4 rounded border-neutral-300 text-olive-600 focus:ring-olive-500" />
          <span className="text-sm text-neutral-600 dark:text-neutral-400">Apply as Secretary</span>
        </label>
        <button type="submit" disabled={loading} className="btn-primary w-full text-base py-3 disabled:opacity-60">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Community'}
        </button>
      </form>
    </motion.div>
  );
}
