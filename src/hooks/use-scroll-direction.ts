import { useEffect, useState } from 'react';

export default function useScrollDirection(threshold = 10) {
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    let lastScrollY: number | null = null;
    let tick = false;
    document.addEventListener('scroll', () => {
      lastScrollY ??= window.scrollY;
      if (!tick) {
        requestAnimationFrame(() => {
          if (lastScrollY && lastScrollY < window.scrollY - threshold) setDirection('down');
          if (lastScrollY && lastScrollY > window.scrollY + threshold) setDirection('up');
          tick = false;
          lastScrollY = window.scrollY;
        });
      }
      tick = true;
    });
  });

  return direction;
}
