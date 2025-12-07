import React from 'react';

import type { Metadata } from 'next';
import CatalogClientPage from './pageClient';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Campify Catalog — Browse Camper Vans',
  description:
    'Explore the full catalog of camper vans on Campify: Travel Trucks. Filter by location, vehicle type and amenities to find the perfect camper for your trip.',
  alternates: {
    canonical: `${SITE_URL}/catalog`,
  },
  openGraph: {
    title: 'Campify Catalog — Camper Vans for Rent',
    description: 'Browse and filter camper vans by location, type and amenities on Campify: Travel Trucks.',
    url: `${SITE_URL}/catalog`,
    siteName: 'Campify: Travel Trucks',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/campify.webp`,
        width: 1200,
        height: 630,
        alt: 'Campify catalog of camper vans',
      },
    ],
  },
};

function CatalogPage() {
  return (
    <div>
      <CatalogClientPage />
    </div>
  );
}

export default CatalogPage;
