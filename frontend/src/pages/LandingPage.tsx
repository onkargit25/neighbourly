import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { WhyNeighbourly } from '@/components/landing/WhyNeighbourly';
import { NeighbourActions } from '@/components/landing/NeighbourActions';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { CommunityTypes } from '@/components/landing/CommunityTypes';
import { ForResidentsSecretaries } from '@/components/landing/ForResidentsSecretaries';
import { FeatureHighlights } from '@/components/landing/FeatureHighlights';
import { Testimonials } from '@/components/landing/Testimonials';
import { FAQ } from '@/components/landing/FAQ';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { Footer } from '@/components/landing/Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <Navbar />
      <main>
        <Hero />
        <WhyNeighbourly />
        <NeighbourActions />
        <HowItWorks />
        <CommunityTypes />
        <ForResidentsSecretaries />
        <FeatureHighlights />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
