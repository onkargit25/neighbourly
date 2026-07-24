import { motion } from 'framer-motion';
import { Package, Handshake, Heart, Briefcase, HandHeart } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Animations';

const actions = [
  { icon: Package, title: 'Borrow', description: 'Borrow everyday household items from your neighbours.' },
  { icon: Handshake, title: 'Lend', description: 'Share unused resources and help your community.' },
  { icon: Heart, title: 'Donate', description: 'Give useful items a second life with someone who needs them.' },
  { icon: Briefcase, title: 'Offer Services', description: 'Earn by sharing your skills with trusted neighbours.' },
  { icon: HandHeart, title: 'Help', description: 'Support neighbours during emergencies and everyday needs.' },
];

export function NeighbourActions() {
  return (
    <section className="py-20 md:py-28 bg-neutral-50/50 dark:bg-neutral-900/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="section-heading">What You Can Do</h2>
          <p className="section-subheading mt-4">
            Five simple actions that bring your community closer together.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {actions.map(action => {
            const Icon = action.icon;
            return (
              <StaggerItem key={action.title}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="card-hover h-full text-center border-t-2 border-olive-200"
                >
                  <div className="w-14 h-14 rounded-2xl bg-olive-50 flex items-center justify-center mx-auto mb-4 text-olive-700">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-lg mb-2">{action.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{action.description}</p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
