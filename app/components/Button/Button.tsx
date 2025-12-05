'use client';

import Link from 'next/link';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'loadMore';

type BaseProps = {
  label: string;
  className?: string;
  variant?: ButtonVariant;
};

type ButtonProps =
  | (BaseProps & { href: string; onClick?: never; type?: never })
  | (BaseProps & { href?: undefined; onClick: () => void; type?: 'button' })
  | (BaseProps & { href?: undefined; onClick?: never; type: 'submit' | 'reset' });

export function Button(props: ButtonProps) {
  const { label, className, variant = 'primary' } = props;

  const variantClass = styles[variant];

  if ('href' in props && props.href) {
    return (
      <Link href={props.href} className={`${styles.button} ${variantClass} ${className || ''}`}>
        {label}
      </Link>
    );
  }

  if (props.type === 'submit' || props.type === 'reset') {
    return (
      <button type={props.type} className={`${styles.button} ${variantClass} ${className || ''}`}>
        {label}
      </button>
    );
  }

  return (
    <button type="button" onClick={props.onClick} className={`${styles.button} ${variantClass} ${className || ''}`}>
      {label}
    </button>
  );
}
