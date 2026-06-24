/**
 * Landing Domain Types
 * Type definitions for landing page components
 */

export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

export interface Logo {
  name: string;
  imageUrl?: string;
}

export interface HeroContent {
  badge: {
    text: string;
    status: 'available' | 'limited' | 'sold-out';
  };
  headline: {
    line1: string;
    line2: string;
    line3: string;
  };
  subtitle: string;
  cta: {
    text: string;
    href: string;
  };
}
