'use client';

import css from './FiltersModal.module.css';
import AsideFilterView from './AsideFilterView';
import { useEffect, useRef } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  shown: number;
  total: number;
  isFetching: boolean;
}

export default function FiltersModal({ open, onClose, shown, total, isFetching }: Props) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const dragging = useRef(false);

  // Close on ESC
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  function onTouchStart(e: React.TouchEvent) {
    dragging.current = true;
    startY.current = e.touches[0].clientY;
  }

  function onTouchMove(e: React.TouchEvent) {
    if (!dragging.current) return;
    currentY.current = e.touches[0].clientY - startY.current;

    if (currentY.current > 0) {
      sheetRef.current!.style.transform = `translateY(${currentY.current}px)`;
    }
  }

  function onTouchEnd() {
    dragging.current = false;

    if (currentY.current > 120) {
      onClose();
    } else {
      sheetRef.current!.style.transform = `translateY(0)`;
    }

    currentY.current = 0;
  }

  if (!open) return null;

  return (
    <div className={css.overlay} onClick={onClose}>
      <div
        className={css.sheet}
        ref={sheetRef}
        onClick={e => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className={css.handleWrapper}>
          <div className={css.handle}></div>
          <button className={css.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>

        <AsideFilterView shown={shown} total={total} isFetching={isFetching} />
      </div>
    </div>
  );
}
