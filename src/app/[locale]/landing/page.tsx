import { Header, HeroSection, LogoTicker } from '@/domains/landing';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Automatix - Automation Agency Beyond Limits',
  description: 'Design services at your fingertips. Pause or cancel anytime. Amplified with AI.',
};

/**
 * Landing Page
 * Modular composition of landing page sections
 */
export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#030303]">
      {/* Floating Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Logo Ticker */}
      <LogoTicker />
    </div>
  );
}
