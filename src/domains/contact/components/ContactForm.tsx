'use client';

import { ArrowUpRight } from 'lucide-react';
import { useContactForm } from '../hooks/useContactForm';

/**
 * Contact Form Component
 * Form with grid background and proper validation
 */
export function ContactForm() {
  const {
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    updateField,
    submitForm
  } = useContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm();
  };

  const serviceOptions = [
    { value: '', label: 'Select Your Service' },
    { value: 'Analytics & Reports', label: 'Analytics & Reporting' },
    { value: 'Brand Strategy', label: 'Brand Strategy' },
    { value: 'Event Planning', label: 'Event Planning' },
    { value: 'Advertising Campaigns', label: 'Advertising Campaigns' },
    { value: 'Consulting Services', label: 'Consulting Services' }
  ];

  const budgetOptions = [
    { value: '', label: 'Select Your Range' },
    { value: 'Under $10.000', label: 'Under $10.000' },
    { value: '$10.000 - $25.000', label: '$10.000 - $25.000' },
    { value: '$25.000 - $50.000', label: '$25.000 - $50.000' },
    { value: 'Above $50.000', label: 'Above $50.000' },
    { value: 'Custom Budget', label: 'Custom Budget' }
  ];

  if (isSubmitted) {
    return (
      <div className="relative">
        {/* Grid Background */}
        <div 
          className="absolute inset-0 rounded-[30px]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M0 0h40v40H0z\'/%3E%3Cpath d=\'M0 0h20v20H0z\' fill=\'%23ffffff\' fill-opacity=\'0.02\'/%3E%3C/g%3E%3C/svg%3E")'
          }}
        />
        
        <div 
          className="relative rounded-[30px] p-12 border border-border text-center bg-card"
        >
          <div className="space-y-4">
            <div 
              className="w-16 h-16 rounded-full mx-auto flex items-center justify-center"
              style={{ backgroundColor: 'rgb(232, 120, 17)' }}
            >
              <ArrowUpRight className="w-8 h-8 text-white" />
            </div>
            <h3 
              className="text-[24px] leading-[32px] font-medium text-foreground"
              style={{ 
                fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif'
              }}
            >
              Thank You!
            </h3>
            <p className="text-[16px] leading-[24px] text-muted-foreground">
              We will contact you within 24 business hours.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Grid Background */}
      <div 
        className="absolute inset-0 rounded-[30px]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M0 0h40v40H0z\'/%3E%3Cpath d=\'M0 0h20v20H0z\' fill=\'%23ffffff\' fill-opacity=\'0.02\'/%3E%3C/g%3E%3C/svg%3E")'
        }}
      />
      
      <form 
        onSubmit={handleSubmit}
        className="relative rounded-[30px] p-8 border border-border space-y-6 bg-card"
      >
        {/* First Row - Name and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Name *"
            type="text"
            placeholder="David Johnson"
            value={formData.name}
            onChange={(value) => updateField('name', value)}
            error={errors.name}
            required
          />
          <FormField
            label="Email *"
            type="email"
            placeholder="example@mail.com"
            value={formData.email}
            onChange={(value) => updateField('email', value)}
            error={errors.email}
            required
          />
        </div>

        {/* Company Name */}
        <FormField
          label="Company Name *"
          type="text"
          placeholder="Ex. StaticMania"
          value={formData.company}
          onChange={(value) => updateField('company', value)}
          error={errors.company}
          required
        />

        {/* Service and Budget */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormSelect
            label="Select Service *"
            options={serviceOptions}
            value={formData.service}
            onChange={(value) => updateField('service', value)}
            error={errors.service}
            required
          />
          <FormSelect
            label="Project Budget *"
            options={budgetOptions}
            value={formData.budget}
            onChange={(value) => updateField('budget', value)}
            error={errors.budget}
            required
          />
        </div>

        {/* Project Details */}
        <FormTextarea
          label="Project Details"
          placeholder="Tell us more about your project"
          value={formData.projectDetails}
          onChange={(value) => updateField('projectDetails', value)}
          error={errors.projectDetails}
        />

        {/* Submit Button and Note */}
        <div className="space-y-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-[10px] transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(45deg, rgb(255, 177, 104) -30%, rgb(227, 109, 0) 100%)'
            }}
          >
            <span 
              className="relative z-10 text-[16px] leading-[22px] font-medium"
              style={{ color: 'rgb(255, 255, 255)' }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </span>
            <ArrowUpRight 
              className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
              style={{ color: 'rgb(255, 255, 255)' }}
              strokeWidth={2}
            />
          </button>

          <p className="text-[14px] leading-[20px] text-muted-foreground">
            We will contact you within 24 business hours.
          </p>
        </div>
      </form>
    </div>
  );
}

/**
 * Form Field Component
 */
function FormField({
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
  required = false
}: {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="block">
        <span className="text-[16px] leading-[24px] font-normal mb-3 block text-foreground">
          {label}
        </span>
        <div className="relative">
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            className="w-full bg-transparent border-0 border-b pb-3 text-[16px] leading-[24px] placeholder:text-muted-foreground/50 focus:outline-none focus:border-orange-400 transition-colors text-foreground"
            style={{
              borderBottomColor: error ? 'rgb(255, 34, 68)' : 'hsl(var(--border))'
            }}
          />
        </div>
      </label>
      {error && (
        <p className="text-[12px] text-red-400">{error}</p>
      )}
    </div>
  );
}

/**
 * Form Select Component
 */
function FormSelect({
  label,
  options,
  value,
  onChange,
  error,
  required = false
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="block">
        <span className="text-[16px] leading-[24px] font-normal mb-3 block text-foreground">
          {label}
        </span>
        <div className="relative">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            className="w-full bg-transparent border-0 border-b pb-3 text-[16px] leading-[24px] focus:outline-none focus:border-orange-400 transition-colors appearance-none cursor-pointer"
            style={{
              color: value ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))',
              borderBottomColor: error ? 'rgb(255, 34, 68)' : 'hsl(var(--border))'
            }}
          >
            {options.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
                className="bg-card text-foreground"
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </label>
      {error && (
        <p className="text-[12px] text-red-400">{error}</p>
      )}
    </div>
  );
}

/**
 * Form Textarea Component
 */
function FormTextarea({
  label,
  placeholder,
  value,
  onChange,
  error
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="block">
        <span className="text-[16px] leading-[24px] font-normal mb-3 block text-foreground">
          {label}
        </span>
        <div className="relative">
          <textarea
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={4}
            className="w-full bg-transparent border-0 border-b pb-3 text-[16px] leading-[24px] placeholder:text-muted-foreground/50 focus:outline-none focus:border-orange-400 transition-colors resize-none text-foreground"
            style={{
              borderBottomColor: error ? 'rgb(255, 34, 68)' : 'hsl(var(--border))'
            }}
          />
        </div>
      </label>
      {error && (
        <p className="text-[12px] text-red-400">{error}</p>
      )}
    </div>
  );
}