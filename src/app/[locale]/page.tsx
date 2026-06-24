import {
  Header,
  HeroSection,
  WhyUsSection,
  CTASection,
} from '@/domains/landing';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gle — The free, fun, and effective way to learn a language!',
  description:
    'Connect by audio with native speakers worldwide and build real conversational confidence. Not a class. Not an app. A live exchange.',
};

export default function Home() {
  return (
    <div className="bg-white min-h-screen font-sans">
      <Header />

      {/* Main content starts below the fixed header */}
      <main>
        <HeroSection />
        <WhyUsSection />
        <CTASection />
      </main>
    </div>
  );
}
