import { Metadata } from 'next';
import React from 'react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

type PageProps = {
  params: { id: string };
};

// 🧠 Базовий робочий варіант (без запиту, але вже динамічний по URL)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = params;

  // 🔽 Коли додаси запит — розкоментуєш / заміниш це на реальні дані
  // const camper = await getCamperById(id);
  // const title = `${camper.name} — Campify: Travel Trucks`;
  // const description = camper.description;
  // const image = camper.gallery?.[0]?.original;

  const title = 'Camper details — Campify: Travel Trucks';
  const description =
    'View detailed information, features, reviews and booking options for this camper on Campify: Travel Trucks.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/catalog/${id}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/catalog/${id}`,
      siteName: 'Campify: Travel Trucks',
      type: 'article',
      // 🧠 Потім підставиш camper.gallery[0].original
      // images: image
      //   ? [
      //       {
      //         url: image,
      //         width: 1200,
      //         height: 630,
      //         alt: camper.name,
      //       },
      //     ]
      //   : undefined,
    },
  };
}

export default function page() {
  return <div>Page-id</div>;
}
