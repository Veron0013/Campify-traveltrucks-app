'use client';

import { useEffect, useState } from 'react';
import IconComponent from '../Icon/Icon.component';
import css from './LocationBlock.module.css';
import { useCamperFilters } from '@/app/stores/camperFiltersStore';
import { useDebounce } from '@/app/lib/hooks/useDebounceSearch';

export default function LocationBlock() {
  const location = useCamperFilters(s => s.filters.location);
  const setFilter = useCamperFilters(s => s.setFilter);

  const [inputValue, setInputValue] = useState(location || '');

  useEffect(() => {
    const setInputData = async () => {
      setInputValue(location || '');
    };
    setInputData();
  }, [location]);

  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    if (debouncedValue === '') {
      setFilter('location', '');
      return;
    }
    setFilter('location', debouncedValue.trim());
  }, [debouncedValue, setFilter]);

  return (
    <div className={css.wrapper}>
      <IconComponent name="map" size={18} isMap />
      <input
        type="text"
        className={css.input}
        placeholder="City"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
    </div>
  );
}
