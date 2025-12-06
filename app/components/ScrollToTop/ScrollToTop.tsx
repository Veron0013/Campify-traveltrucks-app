'use client';

import { useEffect, useRef, useState } from 'react';
import css from './ScrollToTop.module.css';
import { SCROLL_THRESHOLD } from '@/app/lib/vars';
import IconComponent from '../Icon/Icon.component';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const lastScrollableRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScrollToTop = (event: Event) => {
      const target = event.target as HTMLElement | Document;
      const scrollingElement = document.scrollingElement || document.documentElement;

      const yPos = scrollingElement ? scrollingElement.scrollTop : 0;
      let yTarget = 0;

      if (target instanceof HTMLElement) {
        if (target.scrollHeight > target.clientHeight + 4) {
          yTarget = target.scrollTop;
          lastScrollableRef.current = target;
        }
      }

      const y = Math.max(yPos, yTarget);
      setVisible(y > SCROLL_THRESHOLD);
    };

    document.addEventListener('scroll', handleScrollToTop, {
      passive: true,
      capture: true,
    });
    handleScrollToTop(new Event('scroll'));

    return () => {
      document.removeEventListener('scroll', handleScrollToTop, true);
    };
  }, []);

  const handleClick = () => {
    const scrollingElement = document.scrollingElement || document.documentElement;

    if (scrollingElement) {
      scrollingElement.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (lastScrollableRef.current) {
      lastScrollableRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to top"
      className={`${css.scrollToTopBtn} ${visible ? css.scrollToTopBtnVisible : ''}`}
    >
      <IconComponent name="scroll" size={60} />
    </button>
  );
}
