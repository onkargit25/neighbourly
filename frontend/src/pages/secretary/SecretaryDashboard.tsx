import Logo from "@/assets/logos/logo.png";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Package, Briefcase, HandHeart, Megaphone, Calendar, ShieldCheck, Search,
  Plus, Check, X, AlertCircle, LogOut, TrendingUp,
  Loader2, MapPin, Clock, FileText
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { StatCard } from '@/components/ui/Cards';
import { FadeIn } from '@/components/ui/Animations';
import { mockAnnouncements, mockEvents } from '@/data/mockData';

const pendingMembers = [
  { id: 'pm1', name: 'Apartment 12A Resident', date: 'Jan 16, 2024', code: 'GVR2024' },
  { id: 'pm2', name: 'Apartment 5C Resident', date: 'Jan 15, 2024', code: 'GVR2024' },
  { id: 'pm3', name: 'Apartment 8B Resident', date: 'Jan 14, 2024', code: 'GVR2024' },
];

const navItems = [
  { icon: ShieldCheck, label: 'Dashboard', id: 'dashboard' },
  { icon: Users, label: 'Members', id: 'members' },
  { icon: Megaphone, label: 'Announcements', id: 'announcements' },
  { icon: Calendar, label: 'Events', id: 'events' },
  { icon: TrendingUp, label: 'Reports', id: 'reports' },
];

export function SecretaryDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{ member: typeof pendingMembers[0]; action: 'approve' | 'reject' } | null>(null);
  const [members, setMembers] = useState(pendingMembers);
  const [announcementModal, setAnnouncementModal] = useState(false);
  const [eventModal, setEventModal] = useState(false);

  const today = new Date().toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric' });

  const handleMemberAction = (action: 'approve' | 'reject') => {
    if (!confirmAction) return;
    setMembers(prev => prev.filter(m => m.id !== confirmAction.member.id));
    setConfirmAction(null);
  };

  return (
    <div className="min-h-screen bg-neutral-50/50 dark:bg-neutral-950 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-neutral-100 dark:bg-neutral-900 dark:border-neutral-800 fixed h-full z-30">
        <div className="px-6 py-6">
          <button onClick={() => navigate("/")} className="flex items-center">
          <img
            src={Logo}
           alt="Neighbourly Logo"
           className="h-12 w-auto"
             />
         </button>
        </div>
        <div className="px-3 py-2">
          <div className="px-3 py-2 rounded-xl bg-olive-50 dark:bg-olive-900/20 mb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-olive-700" />
              <span className="text-xs font-medium text-olive-700">Secretary Mode</span>
            </div>
          </div>
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={activeSection === item.id ? 'sidebar-link-active w-full mb-1' : 'sidebar-link w-full mb-1'}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </div>
        <div className="mt-auto p-3">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800">
            <div className="w-9 h-9 rounded-full bg-olive-100 flex items-center justify-center text-olive-700 font-medium text-sm">
              {user?.name?.charAt(0) || 'S'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name || 'Secretary'}</p>
              <p className="text-xs text-neutral-400 truncate">{user?.communityName}</p>
            </div>
            <button onClick={() => { logout(); navigate('/'); }} className="text-neutral-400 hover:text-red-500">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile nav */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-neutral-100 dark:bg-neutral-900 dark:border-neutral-800">
        <div className="flex items-center justify-between px-4 h-14">
          <button onClick={() => navigate("/")} className="flex items-center">
          <img
          src={Logo}
         alt="Neighbourly Logo"
        className="h-10 w-auto"
          />
         </button>
          <button onClick={() => setMobileNavOpen(true)} className="p-2">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileNavOpen(false)}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm md:hidden"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              onClick={e => e.stopPropagation()}
              className="absolute right-0 top-0 bottom-0 w-64 bg-white dark:bg-neutral-900 p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-serif text-lg">Menu</span>
                <button onClick={() => setMobileNavOpen(false)}><X className="w-5 h-5 text-neutral-400" /></button>
              </div>
              {navItems.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => { setActiveSection(item.id); setMobileNavOpen(false); }}
                    className={activeSection === item.id ? 'sidebar-link-active w-full mb-1' : 'sidebar-link w-full mb-1'}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 md:pl-64 pt-14 md:pt-0">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {activeSection === 'dashboard' && <DashboardSection members={members} today={today} onAnnouncement={() => setAnnouncementModal(true)} onEvent={() => setEventModal(true)} />}
          {activeSection === 'members' && <MembersSection members={members} onAction={(m, a) => setConfirmAction({ member: m, action: a })} />}
          {activeSection === 'announcements' && <AnnouncementsSection onCreate={() => setAnnouncementModal(true)} />}
          {activeSection === 'events' && <EventsSection onCreate={() => setEventModal(true)} />}
          {activeSection === 'reports' && <ReportsSection />}
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmAction && (
        <ConfirmModal
          member={confirmAction.member}
          action={confirmAction.action}
          onConfirm={handleMemberAction}
          onClose={() => setConfirmAction(null)}
        />
      )}

      {/* Announcement Modal */}
      {announcementModal && <AnnouncementModal onClose={() => setAnnouncementModal(false)} />}

      {/* Event Modal */}
      {eventModal && <EventModal onClose={() => setEventModal(false)} />}
    </div>
  );
}

function DashboardSection({ members, today, onAnnouncement, onEvent }: {
  members: typeof pendingMembers;
  today: string;
  onAnnouncement: () => void;
  onEvent: () => void;
}) {
  const { user } = useAuth();
  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="font-serif text-2xl md:text-3xl">{user?.communityName || 'Green Valley Residency'}</h1>
              <span className="badge-olive flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Verified
              </span>
            </div>
            <p className="text-sm text-neutral-500">{today}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input placeholder="Quick search..." className="pl-10 pr-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-olive-500 dark:bg-neutral-800 dark:border-neutral-700" />
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Quick Actions */}
      <FadeIn delay={0.05}>
        <div className="flex flex-wrap gap-3">
          <button onClick={onAnnouncement} className="btn-primary">
            <Megaphone className="w-4 h-4" />
            Create Announcement
          </button>
          <button onClick={onEvent} className="btn-secondary">
            <Calendar className="w-4 h-4" />
            Create Event
          </button>
          <button className="btn-secondary">
            <Users className="w-4 h-4" />
            Invite Members
          </button>
        </div>
      </FadeIn>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        <StatCard icon={Users} label="Total Members" value={148} color="olive" />
        <StatCard icon={Package} label="Resources Listed" value={6} color="blue" />
        <StatCard icon={Briefcase} label="Active Services" value={4} color="orange" />
        <StatCard icon={HandHeart} label="Active Help Requests" value={4} color="red" />
        <StatCard icon={Megaphone} label="Announcements" value={3} color="olive" />
        <StatCard icon={Calendar} label="Upcoming Events" value={3} color="blue" />
      </div>

      {/* Pending Requests */}
      <FadeIn delay={0.15}>
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-serif text-lg">Pending Member Requests</h2>
            <span className="badge-orange">{members.length} pending</span>
          </div>
          {members.length === 0 ? (
            <div className="card text-center py-8">
              <Check className="w-8 h-8 text-olive-600 mx-auto mb-2" />
              <p className="text-sm text-neutral-500">All caught up! No pending requests.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {members.map((member, i) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="card flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-olive-100 flex items-center justify-center text-olive-700 font-medium text-sm">
                    {member.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{member.name}</p>
                    <p className="text-xs text-neutral-400">Requested {member.date} • Code: {member.code}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-9 h-9 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </button>
                    <button className="w-9 h-9 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </FadeIn>
    </div>
  );
}

function MembersSection({ members, onAction }: {
  members: typeof pendingMembers;
  onAction: (m: typeof pendingMembers[0], a: 'approve' | 'reject') => void;
}) {
  return (
    <div className="space-y-6">
      <FadeIn>
        <h1 className="font-serif text-2xl md:text-3xl">Member Management</h1>
        <p className="text-sm text-neutral-500 mt-1">Review and approve pending membership requests.</p>
      </FadeIn>

      {members.length === 0 ? (
        <div className="card text-center py-12">
          <Check className="w-10 h-10 text-olive-600 mx-auto mb-3" />
          <p className="text-sm text-neutral-500">No pending requests. All caught up!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {members.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-olive-100 flex items-center justify-center text-olive-700 font-medium">
                {member.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{member.name}</p>
                <p className="text-xs text-neutral-400">Requested {member.date} • Code: {member.code}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => onAction(member, 'approve')} className="px-3 py-2 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 text-sm font-medium flex items-center gap-1">
                  <Check className="w-4 h-4" /> Approve
                </button>
                <button onClick={() => onAction(member, 'reject')} className="px-3 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 text-sm font-medium flex items-center gap-1">
                  <X className="w-4 h-4" /> Reject
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function AnnouncementsSection({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="font-serif text-2xl md:text-3xl">Announcements</h1>
            <p className="text-sm text-neutral-500 mt-1">Publish and manage community announcements.</p>
          </div>
          <button onClick={onCreate} className="btn-primary">
            <Plus className="w-4 h-4" />
            Create Announcement
          </button>
        </div>
      </FadeIn>

      <div className="space-y-3">
        {mockAnnouncements.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`card ${a.priority === 'emergency' ? 'border-red-200 bg-red-50/30 dark:bg-red-900/10' : ''}`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                a.priority === 'emergency' ? 'bg-red-100 text-red-600' :
                a.priority === 'important' ? 'bg-orange-100 text-orange-600' :
                'bg-olive-100 text-olive-700'
              }`}>
                {a.priority === 'emergency' ? <AlertCircle className="w-5 h-5" /> : <Megaphone className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-sm">{a.title}</h3>
                  <span className={`badge ${
                    a.priority === 'emergency' ? 'badge-red' :
                    a.priority === 'important' ? 'badge-orange' :
                    'badge-olive'
                  }`}>{a.priority}</span>
                </div>
                <p className="text-xs text-neutral-500">{a.description}</p>
                <p className="text-xs text-neutral-400 mt-2">By {a.authorName} • {new Date(a.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function EventsSection({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="font-serif text-2xl md:text-3xl">Events</h1>
            <p className="text-sm text-neutral-500 mt-1">Organize and manage community events.</p>
          </div>
          <button onClick={onCreate} className="btn-primary">
            <Plus className="w-4 h-4" />
            Create Event
          </button>
        </div>
      </FadeIn>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockEvents.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="card-hover"
          >
            <div className="aspect-video rounded-xl bg-gradient-to-br from-olive-50 to-neutral-100 flex items-center justify-center mb-3 dark:from-olive-900/20 dark:to-neutral-800">
              <Calendar className="w-10 h-10 text-olive-300" />
            </div>
            <h3 className="font-medium text-sm mb-1">{event.title}</h3>
            <p className="text-xs text-neutral-500 line-clamp-2 mb-2">{event.description}</p>
            <div className="flex items-center gap-3 text-xs text-neutral-400">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(event.date).toLocaleDateString()}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{event.time}</span>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800">
              <span className="flex items-center gap-1 text-xs text-neutral-400"><MapPin className="w-3 h-3" />{event.venue}</span>
              <span className="text-xs font-medium text-olive-700">{event.rsvpCount} RSVPs</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ReportsSection() {
  const reports = [
    { label: 'Total Resources Shared', value: 23, icon: Package, color: 'olive' },
    { label: 'Total Borrow Requests', value: 45, icon: Package, color: 'blue' },
    { label: 'Total Services Booked', value: 18, icon: Briefcase, color: 'orange' },
    { label: 'Total Help Requests', value: 12, icon: HandHeart, color: 'red' },
  ];

  return (
    <div className="space-y-6">
      <FadeIn>
        <h1 className="font-serif text-2xl md:text-3xl">Reports & Analytics</h1>
        <p className="text-sm text-neutral-500 mt-1">Community engagement overview.</p>
      </FadeIn>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {reports.map((r, i) => (
          <StatCard key={r.label} icon={r.icon} label={r.label} value={r.value} color={r.color} delay={i * 0.05} />
        ))}
      </div>

      <FadeIn delay={0.1}>
        <div className="card">
          <h3 className="font-serif text-lg mb-4">Community Engagement Rate</h3>
          <div className="flex items-end gap-1 h-40">
            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex-1 bg-olive-200 rounded-t-lg hover:bg-olive-300 transition-colors dark:bg-olive-800 dark:hover:bg-olive-700"
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-neutral-400">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <span key={d}>{d}</span>)}
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="card flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Overall Engagement Rate</p>
            <p className="text-xs text-neutral-400">Based on active participation</p>
          </div>
          <p className="text-3xl font-serif text-olive-700">68%</p>
        </div>
      </FadeIn>
    </div>
  );
}

function ConfirmModal({ member, action, onConfirm, onClose }: {
  member: typeof pendingMembers[0];
  action: 'approve' | 'reject';
  onConfirm: (a: 'approve' | 'reject') => void;
  onClose: () => void;
}) {
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
        onClick={e => e.stopPropagation()}
        className="bg-white dark:bg-neutral-900 rounded-3xl p-6 w-full max-w-sm shadow-float text-center"
      >
        <div className={`w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center ${
          action === 'approve' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
        }`}>
          {action === 'approve' ? <Check className="w-7 h-7" /> : <X className="w-7 h-7" />}
        </div>
        <h3 className="font-serif text-xl mb-2">{action === 'approve' ? 'Approve Member?' : 'Reject Request?'}</h3>
        <p className="text-sm text-neutral-500 mb-6">
          {action === 'approve'
            ? `Are you sure you want to approve ${member.name}? They will gain access to the community.`
            : `Are you sure you want to reject the request from ${member.name}?`}
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="btn-secondary flex-1">Cancel</button>
          <button
            onClick={() => onConfirm(action)}
            className={`flex-1 ${action === 'approve' ? 'btn-primary' : 'btn-danger'}`}
          >
            {action === 'approve' ? 'Approve' : 'Reject'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function AnnouncementModal({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setSuccess(true);
  };

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
        onClick={e => e.stopPropagation()}
        className="bg-white dark:bg-neutral-900 rounded-3xl p-6 w-full max-w-md shadow-float"
      >
        {success ? (
          <div className="text-center py-4">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="w-14 h-14 rounded-full bg-olive-50 flex items-center justify-center mx-auto mb-3">
              <Check className="w-7 h-7 text-olive-600" />
            </motion.div>
            <h3 className="font-serif text-xl mb-2">Announcement Published!</h3>
            <p className="text-sm text-neutral-500 mb-5">Your announcement has been sent to all community members.</p>
            <button onClick={onClose} className="btn-primary">Got it</button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-serif text-xl">Create Announcement</h3>
              <button onClick={onClose} className="text-neutral-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Title</label>
                <input placeholder="Enter announcement title" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Description</label>
                <textarea placeholder="Enter announcement details..." rows={3} className="input-field resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Priority</label>
                <select className="input-field">
                  <option value="normal">Normal</option>
                  <option value="important">Important</option>
                  <option value="emergency">Emergency</option>
                </select>
                <p className="text-xs text-neutral-400 mt-1">Emergency announcements are highlighted and pinned to the top.</p>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" disabled={loading} className="btn-primary flex-1 disabled:opacity-60">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Publish'}
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

function EventModal({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setSuccess(true);
  };

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
        onClick={e => e.stopPropagation()}
        className="bg-white dark:bg-neutral-900 rounded-3xl p-6 w-full max-w-md shadow-float max-h-[90vh] overflow-y-auto"
      >
        {success ? (
          <div className="text-center py-4">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="w-14 h-14 rounded-full bg-olive-50 flex items-center justify-center mx-auto mb-3">
              <Check className="w-7 h-7 text-olive-600" />
            </motion.div>
            <h3 className="font-serif text-xl mb-2">Event Created!</h3>
            <p className="text-sm text-neutral-500 mb-5">Your event has been published. Residents can now RSVP.</p>
            <button onClick={onClose} className="btn-primary">Got it</button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-serif text-xl">Create Event</h3>
              <button onClick={onClose} className="text-neutral-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Event Name</label>
                <input placeholder="Enter event name" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Description</label>
                <textarea placeholder="Enter event description..." rows={2} className="input-field resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Date</label>
                  <input type="date" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Time</label>
                  <input type="time" className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Venue</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input placeholder="Enter venue" className="input-field pl-10" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Banner Image (Optional)</label>
                <div className="border-2 border-dashed border-neutral-200 rounded-xl p-6 text-center dark:border-neutral-700">
                  <FileText className="w-8 h-8 text-neutral-300 mx-auto mb-1" />
                  <p className="text-xs text-neutral-400">Click to upload banner image</p>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" disabled={loading} className="btn-primary flex-1 disabled:opacity-60">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Event'}
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
