import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Animations';

const testimonials = [
  {
    quote: "I borrowed a drill machine from my neighbour instead of buying one. Saved ₹2,000 and made a new friend in the process.",
    role: 'Verified Resident',
    community: 'Green Valley Residency',
  },
  {
    quote: "Managing announcements and events used to take hours on WhatsApp. Now it's all organized in one place. Our community has never been more engaged.",
    role: 'Verified Secretary',
    community: 'Sunrise Apartments',
  },
  {
    quote: "When my mother needed urgent medicine pickup, three neighbours volunteered within minutes. This platform saved us that day.",
    role: 'Community Volunteer',
    community: 'Palm Grove Society',
  },
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-neutral-50/50 dark:bg-neutral-900/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="section-heading">Loved by Communities</h2>
          <p className="section-subheading mt-4">
            Real stories from residents and secretaries using NEIGHBOURLY.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map(t => (
            <StaggerItem key={t.role}>
              <motion.div whileHover={{ y: -6 }} className="card-hover h-full flex flex-col">
                <Quote className="w-8 h-8 text-olive-200 mb-4" />
                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed flex-1 mb-5">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                  <div className="w-10 h-10 rounded-full bg-olive-100 flex items-center justify-center text-olive-700 font-medium text-sm">
                    {t.role.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.role}</p>
                    <p className="text-xs text-neutral-400">{t.community}</p>
                  </div>
                  <div className="ml-auto flex">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} className="w-3 h-3 fill-olive-500 text-olive-500" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
