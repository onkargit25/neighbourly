import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Briefcase, HandHeart, Search, SlidersHorizontal, Heart, MapPin, Star, X, Calendar, MessageSquare, CheckCircle2, Loader2, Clock } from 'lucide-react';
import { mockResources, mockServices, mockHelpRequests } from '@/data/mockData';
import { EmptyState, SkeletonGrid, Rating } from '@/components/ui/Cards';
import { FadeIn } from '@/components/ui/Animations';
import type { Resource, Service, HelpRequest } from '@/types';

const tabs = [
  { id: 'resources', label: 'Resources', icon: Package },
  { id: 'services', label: 'Services', icon: Briefcase },
  { id: 'help', label: 'Community Help', icon: HandHeart },
] as const;

type TabId = typeof tabs[number]['id'];

export function MarketPage() {
  const [activeTab, setActiveTab] = useState<TabId>('resources');

  return (
    <div className="space-y-6">
      <FadeIn>
        <div>
          <h1 className="font-serif text-2xl md:text-3xl">Neighbour Market</h1>
          <p className="text-sm text-neutral-500 mt-1">Browse resources, services, and help requests in your community.</p>
        </div>
      </FadeIn>

      {/* Tabs */}
      <FadeIn delay={0.05}>
        <div className="flex gap-1 p-1 bg-neutral-100 rounded-2xl w-fit dark:bg-neutral-800">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === tab.id ? 'text-olive-800' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tab-bg"
                    className="absolute inset-0 bg-white rounded-xl shadow-sm dark:bg-neutral-700"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </FadeIn>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'resources' && <ResourcesTab />}
          {activeTab === 'services' && <ServicesTab />}
          {activeTab === 'help' && <HelpTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function SearchBar({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-transparent dark:bg-neutral-800 dark:border-neutral-700"
      />
    </div>
  );
}

function FilterButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-sm font-medium hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-700"
    >
      <SlidersHorizontal className="w-4 h-4" />
      <span className="hidden sm:inline">Filters</span>
    </button>
  );
}

function ResourcesTab() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Resource | null>(null);

  const [resources, setResources] = useState<Resource[]>(() => {
    const saved = localStorage.getItem("marketResources");
    return saved ? JSON.parse(saved) : mockResources;
  });

  const [favourites, setFavourites] = useState<Set<string>>(new Set());

  useEffect(() => {
    localStorage.setItem(
      "marketResources",
      JSON.stringify(resources)
    );
  }, [resources]);

  useEffect(() => {
    const updateResources = () => {
      const saved = localStorage.getItem("marketResources");

      if (saved) {
        setResources(JSON.parse(saved));
      }
    };

    window.addEventListener("market-updated", updateResources);

    return () => {
      window.removeEventListener(
        "market-updated",
        updateResources
      );
    };
  }, []);

  const toggleFav = (id: string) => {
    const next = new Set(favourites);

    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }

    setFavourites(next);
  };

  const deleteItem = (id: string) => {
    const updated = resources.filter(
      item => item.id !== id
    );

    setResources(updated);

    localStorage.setItem(
      "marketResources",
      JSON.stringify(updated)
    );
  };

  const filtered = resources.filter(
    r =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">

      <div className="flex gap-3">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search resources..."
        />

        <FilterButton onClick={() => {}} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {filtered.map((resource, i) => (

          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="card-hover p-0 overflow-hidden cursor-pointer"
            onClick={() => setSelected(resource)}
          >

            <div className="relative aspect-video bg-neutral-100 dark:bg-neutral-800">

              <img
                src={resource.image}
                alt={resource.title}
                className="w-full h-full object-cover"
              />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFav(resource.id);
                }}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center"
              >
                <Heart
                  className={`w-4 h-4 ${
                    favourites.has(resource.id)
                      ? "fill-red-500 text-red-500"
                      : "text-neutral-400"
                  }`}
                />
              </button>

              <div className="absolute bottom-3 left-3">
                <span
                  className={`badge ${
                    resource.available
                      ? "badge-green"
                      : "badge-orange"
                  }`}
                >
                  {resource.available
                    ? "Available"
                    : "Borrowed"}
                </span>
              </div>

            </div>

            <div className="p-4">

              <p className="text-xs text-neutral-400 capitalize mb-1">
                {resource.category}
              </p>

              <h3 className="font-medium text-sm mb-1">
                {resource.title}
              </h3>

              <p className="text-xs text-neutral-500 truncate mb-2">
                {resource.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  ₹{resource.deposit} deposit
                </span>

                <span className="text-xs text-neutral-400">
                  {resource.ownerName}
                </span>
              </div>

              {resource.ownerName === "You" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteItem(resource.id);
                  }}
                  className="mt-3 w-full rounded-xl bg-red-500 hover:bg-red-600 text-white py-2 text-sm"
                >
                  Delete Item
                </button>
              )}

            </div>

          </motion.div>

        ))}

      </div>

      {selected && (
        <ResourceDialog
          resource={selected}
          onClose={() => setSelected(null)}
        />
      )}

    </div>
  );
}

function ServicesTab() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Service | null>(null);

  const filtered = mockServices.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  if (filtered.length === 0) {
    return (
      <EmptyState
        icon={Briefcase}
        title="No services available."
        description="Offer your first service and start earning from your skills."
        actionLabel="Offer a Service"
        onAction={() => {}}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search services..." />
        <FilterButton onClick={() => {}} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="card-hover p-0 overflow-hidden cursor-pointer"
            onClick={() => setSelected(service)}
          >
            <div className="relative aspect-video bg-neutral-100 dark:bg-neutral-800">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-3">
                <span className="badge-olive">₹{service.price}/{service.priceUnit}</span>
              </div>
            </div>
            <div className="p-4">
              <p className="text-xs text-neutral-400 capitalize mb-1">{service.category}</p>
              <h3 className="font-medium text-sm mb-1">{service.title}</h3>
              <p className="text-xs text-neutral-500 truncate mb-2">{service.description}</p>
              <div className="flex items-center justify-between">
                <Rating rating={service.rating} count={service.reviewCount} />
                <span className="text-xs text-neutral-400">{service.providerName}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selected && <ServiceDialog service={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function ServiceDialog({ service, onClose }: { service: Service; onClose: () => void }) {
  const [booking, setBooking] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleBook = async () => {
    setBooking(true);
    await new Promise(r => setTimeout(r, 800));
    setBooking(false);
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
        className="bg-white dark:bg-neutral-900 rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-float"
      >
        {success ? (
          <div className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="w-16 h-16 rounded-full bg-olive-50 flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle2 className="w-8 h-8 text-olive-600" />
            </motion.div>
            <h3 className="font-serif text-2xl mb-2">Booking Confirmed!</h3>
            <p className="text-sm text-neutral-500 mb-2">Your booking for {service.title} has been confirmed.</p>
            <p className="text-xs text-neutral-400 mb-6">Payment is handled offline. Please coordinate with the service provider directly.</p>
            <button onClick={onClose} className="btn-primary">Got it</button>
          </div>
        ) : (
          <>
            <div className="relative aspect-video bg-neutral-100 dark:bg-neutral-800 rounded-t-3xl overflow-hidden">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
              <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <span className="text-xs text-neutral-400 capitalize">{service.category}</span>
                <h2 className="font-serif text-2xl">{service.title}</h2>
                <div className="mt-1"><Rating rating={service.rating} count={service.reviewCount} /></div>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">{service.description}</p>

              <div className="grid grid-cols-2 gap-3">
                <div className="card p-3">
                  <p className="text-xs text-neutral-400">Provider</p>
                  <p className="text-sm font-medium">{service.providerName}</p>
                </div>
                <div className="card p-3">
                  <p className="text-xs text-neutral-400">Price</p>
                  <p className="text-sm font-medium">₹{service.price}/{service.priceUnit}</p>
                </div>
              </div>

              <div className="card p-4">
                <p className="text-xs text-neutral-400 mb-2">Payment Information</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Payments are handled offline between you and the service provider. NEIGHBOURLY does not process payments.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={onClose} className="btn-secondary flex-1">Cancel</button>
                <button onClick={handleBook} disabled={booking} className="btn-primary flex-1 disabled:opacity-60">
                  {booking ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Book Service'}
                </button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

function HelpTab() {
  const [selected, setSelected] = useState<HelpRequest | null>(null);

  const priorityColors: Record<string, string> = {
    urgent: 'badge-red',
    high: 'badge-orange',
    medium: 'badge-blue',
    low: 'badge-olive',
  };

  const statusColors: Record<string, string> = {
    open: 'badge-green',
    in_progress: 'badge-orange',
    resolved: 'badge-olive',
  };

  if (mockHelpRequests.length === 0) {
    return (
      <EmptyState
        icon={HandHeart}
        title="No active requests."
        description="Be the first to request help or volunteer for a neighbour in need."
        actionLabel="Request Help"
        onAction={() => {}}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mockHelpRequests.map((request, i) => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="card-hover"
          >
            <div className="flex items-start justify-between mb-3">
              <span className={priorityColors[request.priority]}>{request.priority}</span>
              <span className={statusColors[request.status]}>{request.status.replace('_', ' ')}</span>
            </div>
            <h3 className="font-medium text-sm mb-1">{request.title}</h3>
            <p className="text-xs text-neutral-500 mb-3 line-clamp-2">{request.description}</p>
            <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800">
              <span className="text-xs text-neutral-400">{request.requesterName}</span>
              <button
                onClick={() => setSelected(request)}
                disabled={request.status !== 'open'}
                className="text-xs font-medium text-olive-700 hover:underline disabled:opacity-40"
              >
                {request.status === 'open' ? 'Volunteer' : 'View Details'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {selected && <HelpDialog request={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function HelpDialog({ request, onClose }: { request: HelpRequest; onClose: () => void }) {
  const [volunteering, setVolunteering] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleVolunteer = async () => {
    setVolunteering(true);
    await new Promise(r => setTimeout(r, 800));
    setVolunteering(false);
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
        className="bg-white dark:bg-neutral-900 rounded-3xl w-full max-w-md shadow-float p-6"
      >
        {success ? (
          <div className="text-center py-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="w-16 h-16 rounded-full bg-olive-50 flex items-center justify-center mx-auto mb-4"
            >
              <Heart className="w-8 h-8 text-olive-600 fill-olive-600" />
            </motion.div>
            <h3 className="font-serif text-2xl mb-2">Thank You!</h3>
            <p className="text-sm text-neutral-500 mb-6">You've volunteered to help. The requester will be notified and can contact you directly.</p>
            <button onClick={onClose} className="btn-primary">Got it</button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl">Help Request</h2>
              <button onClick={onClose} className="text-neutral-400"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <span className="badge-red">{request.priority}</span>
              </div>
              <h3 className="font-medium">{request.title}</h3>
              <p className="text-sm text-neutral-500">{request.description}</p>
              <div className="card p-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-neutral-400" />
                <span className="text-xs text-neutral-500">Posted by {request.requesterName}</span>
              </div>
              <button onClick={handleVolunteer} disabled={volunteering || request.status !== 'open'} className="btn-primary w-full disabled:opacity-60">
                {volunteering ? <Loader2 className="w-4 h-4 animate-spin" /> : 'I Can Help'}
              </button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
