import { motion } from 'framer-motion';
import heroIllustration from "@/assets/final illustration.jpeg";
import { Play, Star, Package, Briefcase, Heart, Megaphone, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AnimatedCounter } from '@/components/ui/Animations';

const stats = [
  { label: 'Communities', value: 120, suffix: '+' },
  { label: 'Verified Members', value: 8500, suffix: '+' },
  { label: 'Resources Shared', value: 23000, suffix: '+' },
  { label: 'Successful Requests', value: 15000, suffix: '+' },
];

const floatingCards = [
  { icon: Package, title: 'Drill Available', subtitle: 'Available Now', color: 'bg-olive-50 text-olive-700', position: 'top-4 -left-4', delay: 0 },
  { icon: Briefcase, title: 'Math Tutor', subtitle: '₹300/hour', color: 'bg-blue-50 text-blue-600', position: 'top-1/3 -right-6', delay: 0.5 },
  { icon: Heart, title: 'Need Medicine', subtitle: 'Urgent', color: 'bg-red-50 text-red-600', position: 'bottom-1/3 -left-6', delay: 1 },
  { icon: Megaphone, title: 'Society Meeting', subtitle: 'Tomorrow • 6 PM', color: 'bg-orange-50 text-orange-600', position: 'bottom-4 right-4', delay: 1.5 },
];

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      {/* Soft gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-olive-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-50/60 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-olive-50 border border-olive-100 mb-6"
            >
              <div className="flex">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className="w-3 h-3 fill-olive-600 text-olive-600" />
                ))}
              </div>
              <span className="text-xs font-medium text-olive-800">Trusted Community Platform</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-balance"
            >
              Everything Your Community Needs.{' '}
              <span className="text-olive-700">One Trusted Platform.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Save money by borrowing instead of buying. Earn money by offering trusted local services. Help neighbours, donate useful items, and stay connected with your residential community—all from one secure platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <button onClick={() => navigate('/register')} className="btn-primary text-base px-6 py-3">
                Join Your Community
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="btn-secondary text-base px-6 py-3">
                <Play className="w-4 h-4" />
                Watch Demo
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {stats.map((stat, i) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="text-2xl lg:text-3xl font-serif font-medium text-olive-800">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} delay={i * 0.1} />
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Hero illustration area with floating cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Hero Illustration */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <img
              src={heroIllustration}
              alt="Neighbourly Community Illustration"
              className="w-full h-full object-contain"
              draggable={false}
              />
              </div>

              {/* Floating glassmorphism cards */}
              {floatingCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + card.delay * 0.2, duration: 0.5 }}
                    className={`absolute ${card.position} glass-card p-3 w-44 animate-float-slow`}
                    style={{ animationDelay: `${i * 1.5}s` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl ${card.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{card.title}</p>
                        <p className="text-xs text-neutral-500 truncate">{card.subtitle}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
