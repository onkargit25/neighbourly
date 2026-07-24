import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Megaphone, Package, Briefcase, HandHeart, Calendar, CheckCircle2, AlertCircle, Bell, CheckCheck, Trash2, X } from 'lucide-react';
import { mockNotifications } from '@/data/mockData';
import { EmptyState } from '@/components/ui/Cards';
import { FadeIn } from '@/components/ui/Animations';
import type { Notification, NotificationType } from '@/types';

const filters = ['All', 'Announcements', 'Resources', 'Services', 'Help', 'Events'] as const;
type Filter = typeof filters[number];

const typeIcons: Record<NotificationType, typeof Megaphone> = {
  announcement: Megaphone,
  borrow_request: Package,
  borrow_approval: CheckCircle2,
  service_booking: Briefcase,
  help_request: HandHeart,
  event: Calendar,
  member_approved: CheckCircle2,
  emergency: AlertCircle,
};

const typeColors: Record<NotificationType, string> = {
  announcement: 'text-orange-600 bg-orange-50',
  borrow_request: 'text-olive-600 bg-olive-50',
  borrow_approval: 'text-green-600 bg-green-50',
  service_booking: 'text-blue-600 bg-blue-50',
  help_request: 'text-red-600 bg-red-50',
  event: 'text-purple-600 bg-purple-50',
  member_approved: 'text-green-600 bg-green-50',
  emergency: 'text-red-600 bg-red-50',
};

const filterMap: Record<Filter, NotificationType[]> = {
  All: [],
  Announcements: ['announcement', 'emergency'],
  Resources: ['borrow_request', 'borrow_approval'],
  Services: ['service_booking'],
  Help: ['help_request'],
  Events: ['event'],
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeFilter, setActiveFilter] = useState<Filter>('All');

  const filtered = activeFilter === 'All'
    ? notifications
    : notifications.filter(n => filterMap[activeFilter].includes(n.type));

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="font-serif text-2xl md:text-3xl">Notifications</h1>
            <p className="text-sm text-neutral-500 mt-1">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : 'You\'re all caught up'}
            </p>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="btn-ghost">
              <CheckCheck className="w-4 h-4" />
              Mark all read
            </button>
          )}
        </div>
      </FadeIn>

      {/* Filters */}
      <FadeIn delay={0.05}>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilter === f
                  ? 'bg-olive-700 text-white'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Notifications */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No notifications here."
          description="You'll see updates about announcements, resources, and community activity here."
        />
      ) : (
        <div className="space-y-2">
          <AnimatePresence>
            {filtered.map((notif, i) => {
              const Icon = typeIcons[notif.type];
              return (
                <motion.div
                  key={notif.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.03 }}
                  className={`card flex items-start gap-3 p-4 ${!notif.read ? 'border-olive-200 bg-olive-50/30 dark:bg-olive-900/10' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${typeColors[notif.type]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium">{notif.title}</p>
                      {!notif.read && <span className="w-2 h-2 rounded-full bg-olive-600 flex-shrink-0 mt-1.5" />}
                    </div>
                    <p className="text-xs text-neutral-500 mt-0.5">{notif.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-neutral-400">{timeAgo(notif.createdAt)}</span>
                      {!notif.read && (
                        <button onClick={() => markRead(notif.id)} className="text-xs text-olive-700 hover:underline">
                          Mark read
                        </button>
                      )}
                      <button onClick={() => deleteNotification(notif.id)} className="text-xs text-neutral-400 hover:text-red-500">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
