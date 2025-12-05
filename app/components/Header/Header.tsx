import Link from 'next/link';
import React from 'react';

import css from './Header.module.css';
import IconComponent from '../Icon/Icon.component';

function Header() {
  return (
    <header className={css.header}>
      <div className="container">
        <div className={css.header_container}>
          <Link href={'/'} className={css.logo}>
            <svg width="136" height="16" aria-hidden="true">
              <use href="/icons/logo.svg"></use>
            </svg>
          </Link>
          <ul className={css.nav_list}>
            <li className={css.nav_list_item}>
              <Link className={css.nav_list_item_link} href="/">
                Home
              </Link>
            </li>
            <li>
              <Link href="/catalog">Catalog</Link>
            </li>
            <li>
              <Link href="/favorites">
                <IconComponent name="heart-filled" size={20} />
              </Link>
            </li>
          </ul>
          <div className={css.right}></div>
        </div>
      </div>
    </header>
  );
}

export default Header;
