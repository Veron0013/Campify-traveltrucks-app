import Link from 'next/link';
import React from 'react';

import css from './Header.module.css';

function Header() {
  return (
    <header className={css.header}>
      <div className="container">
        <div className={css.header_container}>
          <h2>
            Travel<span className={css.styles}>Trucks</span>
          </h2>
          <ul className={css.nav_list}>
            <li className={css.nav_list_item}>
              <Link className={css.nav_list_item_link} href="/">
                Home
              </Link>
            </li>
            <li>
              <Link href="/catalog">Catalog</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
