'use client';
import Link from 'next/link';
import css from './Header.module.css';
import IconComponent from '../Icon/Icon.component';
import { usePathname } from 'next/navigation';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { useState } from 'react';

function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className={css.header}>
      <div className="container">
        <div className={css.header_container}>
          <Link href={'/'} className={css.logo}>
            <svg width="136" height="16" aria-hidden="true">
              <use href="/icons/mainLogo.svg"></use>
            </svg>
          </Link>
          <ul className={css.nav_list}>
            <li className={css.nav_list_item}>
              <Link className={`${css.nav_list_item_link} ${pathname === '/' ? css.nav_active : ''}`} href="/">
                Home
              </Link>
            </li>
            <li>
              <Link
                className={`${css.nav_list_item_link} ${pathname === '/catalog' ? css.nav_active : ''}`}
                href="/catalog"
              >
                Catalog
              </Link>
            </li>
            <li>
              <Link href="/favorites">
                <IconComponent name="heart-filled" size={20} />
              </Link>
            </li>
          </ul>
          <button className={css.burger} onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">
            <IconComponent name={menuOpen ? 'close' : 'menu'} size={24} />
          </button>
          <div className={css.right}></div>
        </div>
        <BurgerMenu menuOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
    </header>
  );
}

export default Header;
