/**
 * Contact Domain - Public Exports
 * Clean architecture barrel exports for contact page components
 */

export { ContactSection } from './components/ContactSection';
export { ContactForm } from './components/ContactForm';
export { ContactInfo } from './components/ContactInfo';

// Types
export type { ContactFormData } from './types/contact.types';

// Hooks
export { useContactForm } from './hooks/useContactForm';