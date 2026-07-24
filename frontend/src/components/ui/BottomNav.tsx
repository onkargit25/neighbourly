import { motion } from 'framer-motion';
import { Home, ShoppingBag, Bell, User, Plus, Package, Heart, Briefcase, HandHeart } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { icon: Home, label: 'Home', path: '/app' },
  { icon: ShoppingBag, label: 'Market', path: '/app/market' },
  { icon: Bell, label: 'Notifications', path: '/app/notifications' },
  { icon: User, label: 'Profile', path: '/app/profile' },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
      >
        <div className="bg-white/90 backdrop-blur-lg border-t border-neutral-200 px-2 py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom)] dark:bg-neutral-900/90 dark:border-neutral-800">
          <div className="flex items-center justify-around max-w-md mx-auto">
            {navItems.slice(0, 2).map(item => (
              <NavButton key={item.path} item={item} active={location.pathname === item.path} onClick={() => navigate(item.path)} />
            ))}
            <div className="w-14" />
            {navItems.slice(2).map(item => (
              <NavButton key={item.path} item={item} active={location.pathname === item.path} onClick={() => navigate(item.path)} />
            ))}
          </div>
        </div>
      </motion.div>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setCreateOpen(true)}
        className="fixed bottom-20 right-4 z-50 md:hidden w-14 h-14 rounded-full bg-olive-700 text-white shadow-float flex items-center justify-center"
        aria-label="Create"
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      {createOpen && <CreateSheet onClose={() => setCreateOpen(false)} />}
    </>
  );
}

function NavButton({ item, active, onClick }: { item: typeof navItems[0]; active: boolean; onClick: () => void }) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-colors min-w-[44px] min-h-[44px] ${
        active ? 'text-olive-700 dark:text-olive-400' : 'text-neutral-400'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="text-[10px] font-medium">{item.label}</span>
    </button>
  );
}

export function CreateSheet({ onClose }: { onClose: () => void }) {
  const options = [
    { icon: Package, label: 'Lend Item', color: 'text-olive-600' },
    { icon: Heart, label: 'Donate Item', color: 'text-red-500' },
    { icon: Briefcase, label: 'Offer Service', color: 'text-blue-600' },
    { icon: HandHeart, label: 'Request Help', color: 'text-orange-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-end md:items-center justify-center"
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={e => e.stopPropagation()}
        className="bg-white dark:bg-neutral-900 rounded-t-3xl md:rounded-3xl p-6 w-full md:max-w-md shadow-float pb-[max(1.5rem,env(safe-area-inset-bottom))]
        "
      >
        <div className="w-10 h-1 bg-neutral-200 rounded-full mx-auto mb-4 md:hidden" />
        <h3 className="font-serif text-xl mb-4">Create</h3>
        <div className="grid grid-cols-2 gap-3">
          {options.map(opt => {
            const Icon = opt.icon;
            return (
              <button
                key={opt.label}
                onClick={onClose}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-neutral-100 hover:border-olive-200 hover:bg-olive-50 transition-all dark:border-neutral-800 dark:hover:bg-olive-900/20"
              >
                <Icon className={`w-6 h-6 ${opt.color}`} />
                <span className="text-sm font-medium">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
