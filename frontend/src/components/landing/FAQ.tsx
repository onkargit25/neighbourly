import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FadeIn } from '@/components/ui/Animations';

const faqs = [
  {
    q: 'What is NEIGHBOURLY?',
    a: 'NEIGHBOURLY is a trusted community platform for residential communities. It enables neighbours to borrow resources, lend unused items, donate goods, offer services, request help, receive announcements, and join community events—all in one secure place.',
  },
  {
    q: 'How do I join my community?',
    a: 'After creating your account, you can join an existing community using a community code provided by your secretary, or create a new community if yours is not yet listed.',
  },
  {
    q: 'Is it free?',
    a: 'Yes, NEIGHBOURLY is free for all residents. There are no subscription fees for borrowing, lending, donating, or requesting help within your community.',
  },
  {
    q: 'Who can become a secretary?',
    a: 'Any verified resident can apply to become a community secretary when creating a new community. For existing communities, the current secretary can assign or transfer the role.',
  },
  {
    q: 'How is my community verified?',
    a: 'Communities are verified through a review process that checks the community details, location, and secretary credentials. Verified communities display a verified badge.',
  },
  {
    q: 'Can I earn money?',
    a: 'Yes. You can offer paid services to your neighbours—such as tutoring, repairs, fitness training, and more. Payments are handled offline between neighbours.',
  },
  {
    q: 'Is my data secure?',
    a: 'Your data is encrypted and only visible to members of your verified community. We never share your personal information with third parties.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <FadeIn className="text-center mb-14">
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <p className="section-subheading mt-4">
            Everything you need to know about NEIGHBOURLY.
          </p>
        </FadeIn>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 text-left py-1"
                aria-expanded={openIndex === i}
              >
                <span className="text-sm font-medium">{faq.q}</span>
                <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-neutral-500 leading-relaxed pt-2 pb-1">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
