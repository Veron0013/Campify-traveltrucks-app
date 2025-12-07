'use client';
import Link from 'next/link';
import css from './BurgerMenu.module.css';
import { usePathname } from 'next/navigation';
import IconComponent from '../Icon/Icon.component';

interface BurgerMenuProps {
  menuOpen: boolean;
  onClose: () => void;
}

export default function BurgerMenu({ menuOpen, onClose }: BurgerMenuProps) {
  const pathname = usePathname();
  return (
    <div className={`${css.burgerMenu} ${menuOpen ? css.active : ''}`}>
      <ul className={css.burgerNav}>
        <li className={css.nav_list_item}>
          <Link
            className={`${css.nav_list_item_link} ${pathname === '/' ? css.nav_active : ''}`}
            href="/"
            onClick={onClose}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className={`${css.nav_list_item_link} ${pathname === '/catalog' ? css.nav_active : ''}`}
            href="/catalog"
            onClick={onClose}
          >
            Catalog
          </Link>
        </li>
        <li>
          <Link
            className={`${css.nav_list_item_link} ${pathname === '/favorites' ? css.nav_active : ''}`}
            href="/favorites"
            onClick={onClose}
          >
            Favorites
          </Link>
        </li>
      </ul>
    </div>
  );
}
