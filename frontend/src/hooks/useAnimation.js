import { useRef, useEffect } from 'react';

export const useAnimation = (animationType = 'fade-in', delay = 0) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add animation classes based on type
          switch (animationType) {
            case 'fade-in':
              ref.current.style.animation = `fadeIn 0.6s ease-out ${delay}s forwards`;
              break;
            case 'slide-up':
              ref.current.style.animation = `slideUp 0.6s ease-out ${delay}s forwards`;
              break;
            case 'slide-right':
              ref.current.style.animation = `slideRight 0.6s ease-out ${delay}s forwards`;
              break;
            case 'scale-up':
              ref.current.style.animation = `scaleUp 0.6s ease-out ${delay}s forwards`;
              break;
            default:
              ref.current.style.animation = `fadeIn 0.6s ease-out ${delay}s forwards`;
          }
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      ref.current.style.opacity = '0';
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [animationType, delay]);

  return ref;
};

// Animation presets for use throughout the application
export const animations = {
  fadeIn: { type: 'fade-in', duration: 0.6 },
  slideUp: { type: 'slide-up', duration: 0.6 },
  scaleIn: { type: 'scale-in', duration: 0.6 },
  fadeInSlideUp: { type: 'fade-in slide-up', duration: 0.6 },
};