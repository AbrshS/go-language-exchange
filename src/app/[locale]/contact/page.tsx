import { Header, FAQSection, CTASection } from '@/domains/landing';
import { ContactSection } from '@/domains/contact';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Automatix',
  description: 'Get in touch with our team. We\'re here to help with expert advice & solutions.',
};

/**
 * Contact Page
 * Contact form and company information with landing page header
 */
export default function ContactPage() {
  return (
    <>
      {/* Same Header as Landing Page */}
      <Header />

      {/* Contact Section */}
      <ContactSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA/Footer Section */}
      <CTASection />
    </>
  );
}