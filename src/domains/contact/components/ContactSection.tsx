'use client';

import { ContactForm } from './ContactForm';
import { ContactInfo } from './ContactInfo';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

/**
 * Contact Section Component
 * Main contact page section with form and company information
 */
export function ContactSection() {
  const { elementRef: sectionRef, isVisible: sectionVisible } = useScrollAnimation({
    threshold: 0.1,
    delay: 100
  });

  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation({
    threshold: 0.2,
    delay: 200
  });

  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation({
    threshold: 0.2,
    delay: 400
  });

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center py-20 px-8 pt-32 overflow-hidden bg-background"
    >
      {/* Background effects similar to hero section */}
      <div className="absolute inset-0 -top-20 bg-background">
        {/* Subtle orange glow */}
        <div 
          className="absolute w-[300px] h-[300px] rounded-full opacity-20"
          style={{
            backgroundColor: 'rgb(232, 120, 17)',
            top: '20%',
            right: '10%',
            transform: 'rotate(-40deg)',
            filter: 'blur(120px)'
          }}
        />
        
        {/* Subtle white glow */}
        <div 
          className="absolute w-[250px] h-[250px] rounded-full opacity-15"
          style={{
            backgroundColor: 'rgb(222, 222, 222)',
            bottom: '30%',
            left: '15%',
            transform: 'rotate(-31deg)',
            filter: 'blur(100px)'
          }}
        />
        
        {/* Dot grid pattern */}
        <div 
          className="absolute inset-0 dark:bg-[radial-gradient(rgba(0,0,0,0)_1px,rgb(5,5,5)_1px)] bg-[radial-gradient(rgba(255,255,255,0)_1px,rgb(255,255,255)_1px)]"
          style={{
            backdropFilter: 'blur(58px)',
            backgroundSize: '9px 9px',
            opacity: 0.3
          }}
        />
      </div>

      <div className="relative z-10 max-w-[900px] mx-auto w-full">
        <div className="flex flex-col items-center gap-20">
          {/* Header */}
          <div ref={headerRef} className={`flex flex-col items-center text-center space-y-5 ${
            headerVisible ? 'scroll-animate-fade-up' : 'scroll-animate-hidden'
          }`}>
            {/* Badge - Double layer structure */}
            <div className="inline-flex rounded-[33px] p-[1px] bg-gradient-to-b from-border/50 to-border/10">
              <div className="px-6 py-3 rounded-[33px] bg-background">
                <span className="text-[14px] leading-[20px] font-normal text-muted-foreground">
                  Let's Talk
                </span>
              </div>
            </div>

            {/* Title - Satoshi 48px/60px weight 500 */}
            <h1 
              className="font-heading text-[48px] leading-[60px] font-medium text-foreground"
              style={{ 
                fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif',
                fontWeight: 500
              }}
            >
              We're Here To Help
            </h1>

            {/* Subtitle - Manrope 18px/29px weight 400 */}
            <p 
              className="font-manrope text-[18px] leading-[29px] font-normal max-w-[600px] text-muted-foreground"
              style={{ 
                fontFamily: 'Manrope, "Manrope Placeholder", sans-serif',
                fontWeight: 400
              }}
            >
              Our team is ready to support you with expert advice & solutions.
            </p>
          </div>

          {/* Main Content */}
          <div ref={contentRef} className={`w-full space-y-12 ${
            contentVisible ? 'scroll-animate-fade-up scroll-animate-delay-200' : 'scroll-animate-hidden'
          }`}>
            {/* Contact Form */}
            <ContactForm />

            {/* Contact Information - Below the form */}
            <ContactInfo />
          </div>
        </div>
      </div>
    </section>
  );
}