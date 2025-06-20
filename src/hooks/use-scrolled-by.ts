import { useEffect, useState } from 'react';

export default function useScrolledBy(y: number) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > y) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  }, [y]);

  return isScrolled;
}
