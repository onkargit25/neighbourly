import { motion } from 'framer-motion';
import { UserPlus, Users, Compass, Repeat, Heart } from 'lucide-react';
import { FadeIn } from '@/components/ui/Animations';

const steps = [
  { icon: UserPlus, title: 'Create Account', description: 'Sign up with your details in under a minute.' },
  { icon: Users, title: 'Join Your Community', description: 'Find your residential community using a community code.' },
  { icon: Compass, title: 'Explore Neighbour Market', description: 'Browse resources, services, and help requests near you.' },
  { icon: Repeat, title: 'Borrow • Lend • Donate • Help', description: 'Start sharing and connecting with your neighbours.' },
  { icon: Heart, title: 'Build Stronger Communities', description: 'Grow trust, reduce waste, and strengthen bonds.' },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="section-heading">How It Works</h2>
          <p className="section-subheading mt-4">
            Get started in five simple steps.
          </p>
        </FadeIn>

        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-olive-200 via-olive-200 to-transparent md:-translate-x-1/2" />

          <div className="space-y-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: isLeft ? -30 : 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex items-center gap-6 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Step number/icon */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-olive-200 flex items-center justify-center shadow-card dark:bg-neutral-900">
                      <Icon className="w-5 h-5 text-olive-700" />
                    </div>
                  </div>

                  {/* Content card */}
                  <div className={`flex-1 ${isLeft ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                    <div className="card-hover inline-block w-full">
                      <span className="text-xs font-medium text-olive-600 mb-1 block">Step {i + 1}</span>
                      <h3 className="font-serif text-lg mb-1">{step.title}</h3>
                      <p className="text-sm text-neutral-500">{step.description}</p>
                    </div>
                  </div>

                  {/* Spacer for alternating layout on desktop */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
