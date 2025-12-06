'use client';

import { useState, useRef } from 'react';
import { DayPicker, Formatters } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import css from './DatePickerField.module.css';

interface Props {
  value: string;
  onChange: (date: string) => void;
}

export function DatePickerField({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const formatters: Partial<Formatters> = {
    formatWeekdayName: (weekday: Date) => weekday.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
  };

  const handleSelect = (date: Date | undefined) => {
    if (!date) return;
    onChange(date.toISOString());
    setOpen(false);
  };

  return (
    <div className={css.fieldWrapper} ref={ref}>
      <button
        type="button"
        className={`${css.dateInput} ${!value ? css.placeholder : ''}`}
        onClick={() => setOpen(!open)}
      >
        {value ? format(new Date(value), 'dd MMMM yyyy') : 'Booking date*'}
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
            className={css.calendar}
          />
        </div>
      )}
    </div>
  );
}
