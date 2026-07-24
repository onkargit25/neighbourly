import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { FadeIn } from '@/components/ui/Animations';
import { useNavigate } from 'react-router-dom';

export function FinalCTA() {
  const navigate = useNavigate();

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-olive-50 via-olive-100/50 to-olive-50 dark:from-olive-900/30 dark:via-olive-900/20 dark:to-olive-900/30 border border-olive-100 dark:border-olive-900/40 p-10 md:p-16 text-center">
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-olive-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-olive-200/20 rounded-full blur-3xl" />

            <div className="relative">
              <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-4">
                Ready to Build a Better Community?
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-xl mx-auto mb-8">
                Join thousands of residents building stronger communities together.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={() => navigate('/register')} className="btn-primary text-base px-6 py-3">
                  Join Community
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="btn-secondary text-base px-6 py-3 bg-white/80">
                  <Play className="w-4 h-4" />
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
