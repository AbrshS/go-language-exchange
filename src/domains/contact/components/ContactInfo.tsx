'use client';

import { MapPin, Phone, Mail } from 'lucide-react';

/**
 * Contact Information Component
 * Company contact details with icons - displayed horizontally
 */
export function ContactInfo() {
  const contactDetails = [
    {
      type: 'location' as const,
      title: 'Head Office',
      icon: MapPin,
      details: ['5899 Alexys Highway Suite 678, NR, Nevada, USA']
    },
    {
      type: 'phone' as const,
      title: 'Phone',
      icon: Phone,
      details: ['+1 234 567 890', '+1 234 567 890']
    },
    {
      type: 'email' as const,
      title: 'Email',
      icon: Mail,
      details: ['customer@automx.com', 'client@automx.com']
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[900px] mx-auto">
      {contactDetails.map((contact, index) => (
        <div key={contact.type} className="flex flex-col items-center">
          <ContactInfoItem contact={contact} />
        </div>
      ))}
    </div>
  );
}

/**
 * Contact Info Item Component
 */
function ContactInfoItem({ 
  contact 
}: { 
  contact: {
    type: 'location' | 'phone' | 'email';
    title: string;
    icon: any;
    details: string[];
  }
}) {
  const Icon = contact.icon;

  return (
    <div className="space-y-4 text-center">
      {/* Icon */}
      <div className="flex justify-center">
        <div 
          className="w-16 h-16 rounded-full border flex items-center justify-center"
          style={{
            backgroundColor: 'rgba(232, 120, 17, 0.1)',
            borderColor: 'rgba(232, 120, 17, 0.3)'
          }}
        >
          <Icon 
            className="w-7 h-7"
            style={{ color: 'rgb(232, 120, 17)' }}
            strokeWidth={2}
          />
        </div>
      </div>

      {/* Title */}
      <h3 
        className="text-[20px] leading-[28px] font-medium"
        style={{ 
          fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif',
          fontWeight: 500,
          color: 'rgb(222, 222, 222)'
        }}
      >
        {contact.title}
      </h3>

      {/* Details */}
      <div className="space-y-2">
        {contact.details.map((detail, index) => (
          <div key={index}>
            {contact.type === 'email' ? (
              <a
                href={`mailto:${detail}`}
                className="text-[16px] leading-[24px] font-normal transition-colors duration-300 hover:text-orange-400 block"
                style={{ 
                  fontFamily: 'Manrope, "Manrope Placeholder", sans-serif',
                  color: 'rgb(175, 175, 175)'
                }}
              >
                {detail}
              </a>
            ) : contact.type === 'phone' ? (
              <a
                href={`tel:${detail}`}
                className="text-[16px] leading-[24px] font-normal transition-colors duration-300 hover:text-orange-400 block"
                style={{ 
                  fontFamily: 'Manrope, "Manrope Placeholder", sans-serif',
                  color: 'rgb(175, 175, 175)'
                }}
              >
                {detail}
              </a>
            ) : (
              <p 
                className="text-[16px] leading-[24px] font-normal"
                style={{ 
                  fontFamily: 'Manrope, "Manrope Placeholder", sans-serif',
                  color: 'rgb(175, 175, 175)'
                }}
              >
                {detail}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}