import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  suffix?: string;
  color?: string;
  delay?: number;
}

export function StatCard({ icon: Icon, label, value, suffix = '', color = 'olive', delay = 0 }: StatCardProps) {
  const colorMap: Record<string, string> = {
    olive: 'bg-olive-50 text-olive-700 dark:bg-olive-900/20 dark:text-olive-400',
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    green: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    orange: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
    red: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
    purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4 }}
      className="card-hover"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p className="text-2xl font-serif font-medium">{value.toLocaleString()}{suffix}</p>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">{label}</p>
    </motion.div>
  );
}

interface RatingProps {
  rating: number;
  count?: number;
}

export function Rating({ rating, count }: RatingProps) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map(i => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${i <= Math.round(rating) ? 'fill-olive-500 text-olive-500' : 'text-neutral-300'}`}
          />
        ))}
      </div>
      <span className="text-xs text-neutral-500 ml-1">{rating.toFixed(1)}{count !== undefined && ` (${count})`}</span>
    </div>
  );
}

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-olive-50 flex items-center justify-center mb-4 dark:bg-olive-900/20">
        <Icon className="w-10 h-10 text-olive-400" />
      </div>
      <h3 className="font-serif text-xl mb-2">{title}</h3>
      <p className="text-sm text-neutral-500 max-w-sm mb-4">{description}</p>
      {actionLabel && onAction && (
        <button onClick={onAction} className="btn-primary">
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
}

export function SkeletonCard() {
  return (
    <div className="card">
      <div className="skeleton h-40 mb-3" />
      <div className="skeleton h-4 w-2/3 mb-2" />
      <div className="skeleton h-3 w-1/2" />
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
