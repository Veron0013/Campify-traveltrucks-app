'use client';

import { useState, useRef, useEffect } from 'react';
import { DayPicker, Formatters } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import css from './DatePickerField.module.css';
import { SELECT_DATE } from '@/app/lib/vars';
import { da } from 'react-day-picker/locale';

interface Props {
  value: string;
  onChange: (date: string) => void;
  error?: string;
  touched?: boolean;
}

export function DatePickerField({ value, onChange, error, touched }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [placeholder, setPlaceholder] = useState<string>('Booking date*');

  const hasError = !!error && touched;

  const formatters: Partial<Formatters> = {
    formatWeekdayName: (weekday: Date) => weekday.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
  };

  const TODAY = (() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  })();

  const handleSelect = (date: Date | undefined) => {
    if (!date) return;

    if (date < TODAY) {
      setPlaceholder(SELECT_DATE);
      return;
    }

    const formatted = format(date, 'dd MMMM yyyy');

    if (formatted !== value) {
      onChange(formatted);
    }
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div className={css.fieldWrapper} ref={ref}>
      <button
        type="button"
        title="Select a date starting from today"
        className={`${css.input} ${hasError && css.inputError} ${!value ? css.placeholder : ''}`}
        onClick={() => setOpen(!open)}
      >
        {value ? format(new Date(value), 'dd MMMM yyyy') : placeholder}
      </button>

      {open && (
        <div className={css.datePopup}>
          <div className={css.popupArrow}></div>

          <DayPicker
            mode="single"
            selected={value ? new Date(value) : undefined}
            onSelect={handleSelect}
            formatters={formatters}
            weekStartsOn={1}
            disabled={[{ before: TODAY }]}
            className={css.calendar}
            footer={SELECT_DATE}
          />
        </div>
      )}
    </div>
  );
}
