'use client';

import { useState } from 'react';
import { ContactFormData, ContactFormErrors, ContactFormState } from '../types/contact.types';

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  company: '',
  service: '',
  budget: '',
  projectDetails: ''
};

const initialFormState: ContactFormState = {
  data: initialFormData,
  errors: {},
  isSubmitting: false,
  isSubmitted: false
};

/**
 * Contact Form Hook
 * Handles form state, validation, and submission
 */
export function useContactForm() {
  const [formState, setFormState] = useState<ContactFormState>(initialFormState);

  const updateField = (field: keyof ContactFormData, value: string) => {
    setFormState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [field]: value
      },
      errors: {
        ...prev.errors,
        [field]: undefined // Clear error when user starts typing
      }
    }));
  };

  const validateForm = (): boolean => {
    const errors: ContactFormErrors = {};
    const { data } = formState;

    // Required field validation
    if (!data.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!data.company.trim()) {
      errors.company = 'Company name is required';
    }

    if (!data.service) {
      errors.service = 'Please select a service';
    }

    if (!data.budget) {
      errors.budget = 'Please select a budget range';
    }

    setFormState(prev => ({
      ...prev,
      errors
    }));

    return Object.keys(errors).length === 0;
  };

  const submitForm = async (): Promise<void> => {
    if (!validateForm()) {
      return;
    }

    setFormState(prev => ({
      ...prev,
      isSubmitting: true
    }));

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      console.log('Form submitted:', formState.data);
      
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        isSubmitted: true
      }));

      // Reset form after successful submission
      setTimeout(() => {
        setFormState(initialFormState);
      }, 3000);

    } catch (error) {
      console.error('Form submission error:', error);
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        errors: {
          ...prev.errors,
          submit: 'Something went wrong. Please try again.'
        }
      }));
    }
  };

  const resetForm = () => {
    setFormState(initialFormState);
  };

  return {
    formData: formState.data,
    errors: formState.errors,
    isSubmitting: formState.isSubmitting,
    isSubmitted: formState.isSubmitted,
    updateField,
    submitForm,
    resetForm
  };
}