import { Metadata } from 'next';
import Hero from './components/Hero/Hero';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Campify: Travel Trucks — Camper Van Rentals in Ukraine',
  description:
    'Campify: Travel Trucks is a modern platform for browsing and booking camper vans across Ukraine. Discover comfortable and fully-equipped campers for your next road trip.',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Campify: Travel Trucks — Camper Van Rentals in Ukraine',
    description:
      'Browse, filter and book camper vans across Ukraine with Campify: Travel Trucks. Plan your next adventure with fully-equipped campers.',
    url: SITE_URL,
    siteName: 'Campify: Travel Trucks',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/img/campify.webp`,
        width: 1200,
        height: 630,
        alt: 'Campify: Travel Trucks — camper vans for rent',
      },
    ],
  },
};

export default function Home() {
  return (
    <section className="main">
      <Hero />
    </section>
  );
}
