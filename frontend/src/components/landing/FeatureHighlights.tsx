import Logo from "../../assets/logos/logo.png";
import { motion } from 'framer-motion';
import { Package, Briefcase, Heart, Megaphone, ShieldCheck, ArrowRight } from 'lucide-react';
import { FadeIn } from "../ui/Animations";
import ResourceSharing from "../../assets/features/resource.jpeg";
import CommunityServices from "../../assets/features/community-services.jpeg";
import CommunityHelp from "../../assets/features/community-help.jpeg";
import Announcements from "../../assets/features/announcements.png";
import VerifiedCommunity from "../../assets/features/verified.jpeg";

const features = [
  {
    icon: Package,
    image: ResourceSharing,
    title: "Resource Sharing",
    description:
      "Borrow and lend household items within your verified community. Track availability, deposits, and return dates—all in one place.",
    cta: "Explore Resources",
  },

  {
    icon: Briefcase,
    image: CommunityServices,
    title: "Community Services",
    description:
      "Offer your skills as paid services to neighbours. From tutoring to repairs, build a trusted local service network.",
    cta: "Browse Services",
  },

  {
    icon: Heart,
    image: CommunityHelp,
    title: "Community Help",
    description:
      "Request help during emergencies or everyday needs. Volunteers from your community can step in quickly.",
    cta: "View Help Requests",
  },

  {
    icon: Megaphone,
    image: Announcements,
    title: "Announcements & Events",
    description:
      "Stay informed with community announcements and events. RSVP, get reminders, and never miss what matters.",
    cta: "See Announcements",
  },

  {
    icon: ShieldCheck,
    image: VerifiedCommunity,
    title: "Verified Communities",
    description:
      "Every community is verified to ensure trust. Only real residents of verified communities can join and interact.",
    cta: "Learn More",
  },
];

export function FeatureHighlights() {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="section-heading">Powerful Features, Simple Design</h2>
          <p className="section-subheading mt-4">
            Everything you need to build a stronger, more connected community.
          </p>
        </FadeIn>

        <div className="space-y-20">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const isReversed = i % 2 === 1;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${isReversed ? 'lg:[&>*:first-child]:order-2' : ''}`}
              >
                {/* Text content */}
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-olive-50 flex items-center justify-center text-olive-700 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl lg:text-3xl mb-3">{feature.title}</h3>
                  <p className="text-neutral-500 leading-relaxed mb-5 max-w-md">{feature.description}</p>
                  <button className="btn-secondary">
                    {feature.cta}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

          {/* Illustration placeholder */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-olive-100 shadow-xl">

  <img
    src={feature.image}
    alt={feature.title}
    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
  />

  {/* Branding */}
  <div className="absolute bottom-5 right-5 bg-white/90 backdrop-blur-md rounded-xl px-4 py-2 shadow-xl flex items-center gap-2">

    <img
      src={Logo}
      alt="Neighbourly"
      className="w-8 h-8 object-contain"
    />

    <span className="font-semibold text-olive-700">
      Neighbourly
    </span>

  </div>

</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
