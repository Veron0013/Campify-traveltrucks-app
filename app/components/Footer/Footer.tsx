'use client';
import Link from 'next/link';
import css from './Footer.module.css';

function Footer() {
  return (
    <footer className={css.footer}>
      <div className="container">
        <div className={css.footerContainer}>
          <p className={css.text}>
            Developed by
            <Link className={css.text} href="https://github.com/Veron0013" target="_blank">
              {' '}
              Igor Vdovyka
            </Link>
          </p>

          <p className={css.copyright}>© 2025 All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
