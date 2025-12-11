import { Metadata } from 'next';
import Link from 'next/link';
import css from './NotFound.module.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: `404 - Campify: Page not found`,
  description: 'Page not found',
  openGraph: {
    title: `404 - Campify: Page not found`,
    description: 'Page not found',
    url: SITE_URL,
    siteName: 'Campify',
    type: 'website',
  },
};

const NotFound = () => {
  return (
    <div className="container">
      <div className={css.NotFoundContainer}>
        <h2 className={css.NotFoundTitle}>OOPS!!!</h2>
        <p className={css.NotFoundTitle}>404</p>
        <h3 className={css.NotFoundDescr}>Page not found</h3>
        <p className={css.NotFoundText}>try go Home Page</p>

        <Link href="/" className={css.NotFoundLink}>
          Home Page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
