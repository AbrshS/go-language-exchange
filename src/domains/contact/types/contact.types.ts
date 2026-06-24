/**
 * Contact Domain Types
 */

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  projectDetails: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  company?: string;
  service?: string;
  budget?: string;
  projectDetails?: string;
}

export interface ContactFormState {
  data: ContactFormData;
  errors: ContactFormErrors;
  isSubmitting: boolean;
  isSubmitted: boolean;
}

export interface ContactInfo {
  type: 'location' | 'phone' | 'email';
  title: string;
  icon: string;
  details: string[];
}