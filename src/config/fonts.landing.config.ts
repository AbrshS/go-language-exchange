import { Manrope } from 'next/font/google';

/**
 * Manrope font - Body text font for Automatix landing
 * Font-weight: 400, Font-size: 18px, Line-height: 29px
 */
export const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-manrope',
  display: 'swap',
});

// Satoshi will be loaded via CSS @import in globals.css
