'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to get theme-aware colors from CSS variables
 * Returns colors that automatically update when theme changes
 */
export function useThemeColors() {
  const [colors, setColors] = useState({
    bg: 'rgb(5, 5, 5)',
    bgSecondary: 'rgb(17, 17, 17)',
    cardBg: 'rgb(17, 17, 17)',
    cardBorder: 'rgba(255, 255, 255, 0.1)',
    textPrimary: 'rgb(255, 255, 255)',
    textSecondary: 'rgb(175, 175, 175)',
    textMuted: 'rgb(145, 145, 145)',
    badgeBg: 'rgb(5, 5, 5)',
    badgeBorder: 'rgb(33, 33, 33)',
    glowWhiteRgb: '222, 222, 222',
  });

  useEffect(() => {
    const updateColors = () => {
      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);
      
      const newColors = {
        bg: computedStyle.getPropertyValue('--landing-bg').trim() || 'rgb(5, 5, 5)',
        bgSecondary: computedStyle.getPropertyValue('--landing-bg-secondary').trim() || 'rgb(17, 17, 17)',
        cardBg: computedStyle.getPropertyValue('--landing-card-bg').trim() || 'rgb(17, 17, 17)',
        cardBorder: computedStyle.getPropertyValue('--landing-card-border').trim() || 'rgba(255, 255, 255, 0.1)',
        textPrimary: computedStyle.getPropertyValue('--landing-text-primary').trim() || 'rgb(255, 255, 255)',
        textSecondary: computedStyle.getPropertyValue('--landing-text-secondary').trim() || 'rgb(175, 175, 175)',
        textMuted: computedStyle.getPropertyValue('--landing-text-muted').trim() || 'rgb(145, 145, 145)',
        badgeBg: computedStyle.getPropertyValue('--landing-badge-bg').trim() || 'rgb(5, 5, 5)',
        badgeBorder: computedStyle.getPropertyValue('--landing-badge-border').trim() || 'rgb(33, 33, 33)',
        glowWhiteRgb: computedStyle.getPropertyValue('--landing-glow-white-rgb').trim() || '222, 222, 222',
      };
      
      console.log('Theme colors updated:', newColors);
      setColors(newColors);
    };

    // Initial update with a small delay to ensure CSS is loaded
    setTimeout(updateColors, 100);

    // Watch for class changes on html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          console.log('Theme class changed:', document.documentElement.className);
          // Small delay to ensure CSS variables are updated
          setTimeout(updateColors, 50);
        }
      });
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return colors;
}
