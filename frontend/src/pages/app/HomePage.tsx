import { motion } from 'framer-motion';
import { Package, Handshake, Heart, Briefcase, HandHeart, Megaphone, Calendar, Bell, TrendingUp, Users, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { StatCard, EmptyState } from '@/components/ui/Cards';
import { FadeIn } from '@/components/ui/Animations';
import { mockAnnouncements, mockEvents } from '@/data/mockData';

const quickActions = [
  { icon: Package, label: 'Borrow', color: 'bg-olive-50 text-olive-700' },
  { icon: Handshake, label: 'Lend', color: 'bg-blue-50 text-blue-600' },
  { icon: Heart, label: 'Donate', color: 'bg-red-50 text-red-600' },
  { icon: Briefcase, label: 'Offer Service', color: 'bg-orange-50 text-orange-600' },
  { icon: HandHeart, label: 'Request Help', color: 'bg-green-50 text-green-600' },
];

const recentUpdates = [
  { icon: Megaphone, title: 'Water Supply Maintenance', desc: 'Water supply interrupted on Wednesday 9 AM–1 PM', time: '2h ago', color: 'text-orange-600' },
  { icon: CheckCircle2, title: 'Borrow Request Approved', desc: 'Your request for Drill Machine was approved', time: '5h ago', color: 'text-green-600' },
  { icon: Calendar, title: 'Event Reminder', desc: 'Society General Meeting tomorrow at 6 PM', time: '1d ago', color: 'text-blue-600' },
  { icon: HandHeart, title: 'New Help Request', desc: 'A neighbour needs help with medicine pickup', time: '1d ago', color: 'text-red-600' },
];

export function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn>
        <div>
          <h1 className="font-serif text-2xl md:text-3xl">{greeting} 👋</h1>
          <p className="text-sm text-neutral-500 mt-1">Welcome back to {user?.communityName || 'Green Valley Residency'}</p>
        </div>
      </FadeIn>

      {/* Community Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard icon={Users} label="Members" value={148} color="olive" delay={0} />
        <StatCard icon={Package} label="Resources" value={6} color="blue" delay={0.05} />
        <StatCard icon={Briefcase} label="Services" value={4} color="orange" delay={0.1} />
        <StatCard icon={HandHeart} label="Help Requests" value={4} color="red" delay={0.15} />
      </div>

      {/* Quick Actions */}
      <FadeIn delay={0.1}>
        <div>
          <h2 className="font-serif text-lg mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {quickActions.map(action => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.label}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/app/market')}
                  className="card-hover flex flex-col items-center gap-3 py-5"
                >
                  <div className={`w-12 h-12 rounded-2xl ${action.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium">{action.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </FadeIn>

      {/* Recent Updates + Upcoming Events */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Updates */}
        <FadeIn delay={0.15} className="lg:col-span-2">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-serif text-lg">Recent Updates</h2>
              <button className="text-sm text-olive-700 hover:underline">View all</button>
            </div>
            <div className="card divide-y divide-neutral-100 dark:divide-neutral-800 p-0">
              {recentUpdates.map((update, i) => {
                const Icon = update.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3 p-4 first:rounded-t-2xl last:rounded-b-2xl"
                  >
                    <div className={`w-9 h-9 rounded-xl bg-neutral-50 flex items-center justify-center ${update.color} flex-shrink-0 dark:bg-neutral-800`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{update.title}</p>
                      <p className="text-xs text-neutral-500 truncate">{update.desc}</p>
                    </div>
                    <span className="text-xs text-neutral-400 whitespace-nowrap">{update.time}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* Upcoming Events */}
        <FadeIn delay={0.2}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-serif text-lg">Upcoming Events</h2>
            </div>
            <div className="space-y-3">
              {mockEvents.slice(0, 3).map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="card-hover"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 text-center flex-shrink-0">
                      <p className="text-xs text-neutral-400">{new Date(event.date).toLocaleDateString('en', { month: 'short' })}</p>
                      <p className="text-xl font-serif">{new Date(event.date).getDate()}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{event.title}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3 text-neutral-400" />
                        <span className="text-xs text-neutral-500">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-neutral-400" />
                        <span className="text-xs text-neutral-500 truncate">{event.venue}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Community Feed Preview */}
      <FadeIn delay={0.25}>
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-serif text-lg">Community Feed</h2>
            <button onClick={() => navigate('/app/market')} className="text-sm text-olive-700 hover:underline">
              Explore Market
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: 'Resources', count: 6, icon: Package, color: 'text-olive-600' },
              { label: 'Services', count: 4, icon: Briefcase, color: 'text-blue-600' },
              { label: 'Help', count: 4, icon: HandHeart, color: 'text-red-600' },
              { label: 'Announcements', count: 3, icon: Megaphone, color: 'text-orange-600' },
            ].map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => navigate('/app/market')}
                  className="card-hover flex items-center gap-3"
                >
                  <div className={`w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center ${item.color} dark:bg-neutral-800`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-neutral-400">{item.count} active</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
