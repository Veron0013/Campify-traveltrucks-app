import React from 'react';

import type { Metadata } from 'next';
import FavoritesClientPage from './pageClient';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Campify Favorites — Browse Camper Vans',
  description:
    'Explore the full favorites of camper vans on Campify: Travel Trucks. Filter by location, vehicle type and amenities to find the perfect camper for your trip.',
  alternates: {
    canonical: `${SITE_URL}/favorites`,
  },
  openGraph: {
    title: 'Campify Favorites — Camper Vans for Rent',
    description: 'Browse and filter camper vans by location, type and amenities on Campify: Travel Trucks.',
    url: `${SITE_URL}/favorites`,
    siteName: 'Campify: Travel Trucks',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/campify.webp`,
        width: 1200,
        height: 630,
        alt: 'Campify favorites of camper vans',
      },
    ],
  },
};

function page() {
  return (
    <div>
      <FavoritesClientPage />
    </div>
  );
}

export default page;
