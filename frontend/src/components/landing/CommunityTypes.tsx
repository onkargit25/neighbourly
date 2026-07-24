import { motion } from 'framer-motion';
import { Building2, Home, Fence, Warehouse, GraduationCap } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Animations';

const communities = [
  { icon: Building2, title: 'Apartments', description: 'High-rise and low-rise apartment complexes with shared amenities.' },
  { icon: Home, title: 'Housing Societies', description: 'Organised residential societies with elected management committees.' },
  { icon: Fence, title: 'Gated Communities', description: 'Secure gated neighbourhoods with dedicated infrastructure.' },
  { icon: Warehouse, title: 'Residential Colonies', description: 'Established neighbourhood colonies with community bonds.' },
  { icon: GraduationCap, title: 'Student Hostels', description: 'Student housing and hostels with shared living needs.' },
];

export function CommunityTypes() {
  return (
    <section id="communities" className="py-20 md:py-28 bg-neutral-50/50 dark:bg-neutral-900/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="section-heading">Designed for Every Residential Community</h2>
          <p className="section-subheading mt-4">
            Whether you live in an apartment or a gated estate, NEIGHBOURLY adapts to your community.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {communities.map(comm => {
            const Icon = comm.icon;
            return (
              <StaggerItem key={comm.title}>
                <motion.div whileHover={{ y: -6 }} className="card-hover h-full">
                  <div className="aspect-video rounded-xl bg-gradient-to-br from-olive-50 to-neutral-100 flex items-center justify-center mb-4 dark:from-olive-900/20 dark:to-neutral-800">
                    <Icon className="w-12 h-12 text-olive-400" />
                  </div>
                  <h3 className="font-serif text-lg mb-1">{comm.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{comm.description}</p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
