import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useAnimation = (type = 'fade-in', delay = 0) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial state
    gsap.set(element, {
      opacity: type.includes('fade') ? 0 : 1,
      y: type.includes('slide-up') ? 50 : 0,
      scale: type.includes('scale') ? 0 : 1,
    });

    // Create animation
    const animation = gsap.to(element, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      delay,
      ease: 'power2.out',
    });

    // Cleanup
    return () => {
      animation.kill();
    };
  }, [type, delay]);

  return elementRef;
};

// Animation presets for use throughout the application
export const animations = {
  fadeIn: { type: 'fade-in', duration: 0.6 },
  slideUp: { type: 'slide-up', duration: 0.6 },
  scaleIn: { type: 'scale-in', duration: 0.6 },
  fadeInSlideUp: { type: 'fade-in slide-up', duration: 0.6 },
};