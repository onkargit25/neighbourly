import { motion } from 'framer-motion';
import { Check, User, Shield } from 'lucide-react';
import { FadeIn } from '@/components/ui/Animations';

const residents = [
  'Borrow Items',
  'Offer Services',
  'Request Help',
  'Join Events',
  'Stay Updated',
];

const secretaries = [
  'Manage Members',
  'Publish Announcements',
  'Organize Events',
  'Build Community',
  'Moderate Requests',
];

export function ForResidentsSecretaries() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="section-heading">For Residents & Secretaries</h2>
          <p className="section-subheading mt-4">
            One platform, two powerful experiences tailored for every role in your community.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Residents */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card-hover"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-olive-50 flex items-center justify-center text-olive-700">
                <User className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl">Residents</h3>
            </div>
            <ul className="space-y-3">
              {residents.map(item => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-olive-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-olive-700" />
                  </div>
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Secretaries */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card-hover border-olive-200"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-olive-100 flex items-center justify-center text-olive-700">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl">Secretaries</h3>
            </div>
            <ul className="space-y-3">
              {secretaries.map(item => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-olive-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-olive-700" />
                  </div>
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
