import { motion } from 'framer-motion';
import { PiggyBank, Briefcase, ShieldCheck, Leaf } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Animations';

const cards = [
  { icon: PiggyBank, title: 'Save Money', description: 'Borrow instead of buying expensive items you only need occasionally.', color: 'bg-olive-50 text-olive-700' },
  { icon: Briefcase, title: 'Earn Money', description: 'Offer trusted local services to neighbours and earn from your skills.', color: 'bg-blue-50 text-blue-600' },
  { icon: ShieldCheck, title: 'Build Trust', description: 'Verified communities create safer interactions for everyone involved.', color: 'bg-green-50 text-green-600' },
  { icon: Leaf, title: 'Live Sustainably', description: 'Share and donate instead of wasting resources. Reduce, reuse, connect.', color: 'bg-orange-50 text-orange-600' },
];

export function WhyNeighbourly() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="section-heading">Why Choose NEIGHBOURLY?</h2>
          <p className="section-subheading mt-4">
            Modern residential communities deserve more than WhatsApp groups and notice boards.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map(card => {
            const Icon = card.icon;
            return (
              <StaggerItem key={card.title}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="card-hover h-full group"
                >
                  <div className={`w-12 h-12 rounded-2xl ${card.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl mb-2">{card.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{card.description}</p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
