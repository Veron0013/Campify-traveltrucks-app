'use client';

import IconComponent from '../Icon/Icon.component';
import styles from './FilterButton.module.css';

interface Props {
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}

export function FilterButton({ label, icon, active, onClick }: Props) {
  return (
    <button type="button" className={`${styles.button} ${active ? styles.active : ''}`} onClick={onClick}>
      <IconComponent name={icon} size={24} />
      <span className={styles.label}>{label}</span>
    </button>
  );
}

export default FilterButton;
