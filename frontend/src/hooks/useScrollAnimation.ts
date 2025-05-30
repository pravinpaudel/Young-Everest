import { useEffect } from 'react';

export function useScrollAnimation() {
  useEffect(() => {
    // Scroll animation for timeline items
    const animateOnScroll = () => {
      const timelineItems = document.querySelectorAll('.timeline-content');
      
      timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight * 0.85) {
          item.classList.add('animate');
        }
      });
    };
    
    // Run once on mount and then on scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);
}
