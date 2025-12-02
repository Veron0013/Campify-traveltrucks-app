import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import css from './NotFound.module.css';

export const metadata: Metadata = {
  title: `404 - Сторінку на Clothica не знайдено`,
  description: 'Такої сторінки не існує.',
  openGraph: {
    title: `404 - Сторінку на Clothica не знайдено`,
    description: 'Такої сторінки не існує.',
    url: `https://clothica-team-04-frontend.vercel.app/`,
    siteName: 'Clothica',
    type: 'website',
  },
};

const NotFound = () => {
  return (
    <div className={css.NotFoundContainer}>
      <h1 className={css.NotFoundTitle}>OOPS!!!</h1>
      <p className={css.NotFoundTitle}>404</p>
      <h3 className={css.NotFoundDescr}>Page not found</h3>
      <p className={css.NotFoundText}>try go Home Page</p>

      <Link href="/" className={css.NotFoundLink}>
        Home Page
      </Link>
    </div>
  );
};

export default NotFound;
