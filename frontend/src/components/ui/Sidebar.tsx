import { LendItemDialog } from "@/components/dialogs/LendItemDialog";
import Logo from "@/assets/logos/logo.png";
import { motion } from 'framer-motion';
import { Home, ShoppingBag, Bell, User, Plus, Package, Heart, Briefcase, HandHeart, LogOut, Settings, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const navItems = [
  { icon: Home, label: 'Home', path: '/app' },
  { icon: ShoppingBag, label: 'Neighbour Market', path: '/app/market' },
  { icon: Bell, label: 'Notifications', path: '/app/notifications' },
  { icon: User, label: 'Profile', path: '/app/profile' },
];

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <>
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 flex-col bg-white border-r border-neutral-100 z-30 dark:bg-neutral-900 dark:border-neutral-800">
        <div className="px-6 py-6">
          <button onClick={() => navigate("/")} className="flex items-center">
         <img
            src={Logo}
           alt="Neighbourly Logo"
           className="h-12 w-auto"
           />
          </button>
        </div>

        <nav className="flex-1 px-3 py-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={active ? 'sidebar-link-active w-full mb-1' : 'sidebar-link w-full mb-1'}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="px-3 pb-4">
          <button
            onClick={() => setCreateOpen(true)}
            className="w-full btn-primary mb-3"
          >
            <Plus className="w-4 h-4" />
            Create
          </button>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800">
            <div className="w-9 h-9 rounded-full bg-olive-100 flex items-center justify-center text-olive-700 font-medium text-sm">
              {user?.name?.charAt(0) || 'R'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name || 'Resident'}</p>
              <p className="text-xs text-neutral-400 truncate">{user?.communityName}</p>
            </div>
            <button onClick={logout} className="text-neutral-400 hover:text-red-500 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {createOpen && (
  <CreateDialog
    onClose={() => {
      setCreateOpen(false);
      setSelectedType(null);
    }}
    onSelect={(type) => {
      setSelectedType(type);
    }}
  />
)}

{selectedType === "Lend Item" && (
  <LendItemDialog
    onClose={() => setSelectedType(null)}
  />
)}
    </>
  );
}

export function CreateDialog({
  onClose,
  onSelect,
}: {
  onClose: () => void;
  onSelect: (type: string) => void;
}) {
  const options = [
    { icon: Package, label: 'Lend Item', desc: 'Share an item with neighbours', color: 'text-olive-600', bg: 'bg-olive-50' },
    { icon: Heart, label: 'Donate Item', desc: 'Give an item a second life', color: 'text-red-500', bg: 'bg-red-50' },
    { icon: Briefcase, label: 'Offer Service', desc: 'Earn by sharing your skills', color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: HandHeart, label: 'Request Help', desc: 'Ask neighbours for assistance', color: 'text-orange-500', bg: 'bg-orange-50' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={e => e.stopPropagation()}
        className="bg-white dark:bg-neutral-900 rounded-3xl p-6 w-full max-w-md shadow-float"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-serif text-2xl">Create</h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-2">
          {options.map(opt => {
            const Icon = opt.icon;
            return (
              <button
  key={opt.label}
  onClick={() => {
    onClose();
    onSelect(opt.label);
  }}
  className="w-full flex items-center gap-4 p-4 rounded-2xl border border-neutral-100 hover:border-olive-200 hover:bg-olive-50/50 transition-all dark:border-neutral-800 dark:hover:bg-olive-900/20"
>
                <div className={`w-11 h-11 rounded-xl ${opt.bg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${opt.color}`} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">{opt.label}</p>
                  <p className="text-xs text-neutral-400">{opt.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function TopBar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [search, setSearch] = useState('');

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg border-b border-neutral-100 dark:bg-neutral-900/80 dark:border-neutral-800">
      <div className="px-4 md:px-8 py-3 flex items-center gap-4">
       <div className="md:hidden">
      <img
       src={Logo}
       alt="Neighbourly Logo"
       className="h-10 w-auto"
       />
      </div>
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search resources, services or neighbours..."
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-transparent dark:bg-neutral-800 dark:border-neutral-700"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-olive-100 flex items-center justify-center text-olive-700 font-medium text-sm">
            {user?.name?.charAt(0) || 'R'}
          </div>
        </div>
      </div>
    </header>
  );
}
