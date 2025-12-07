import { getCamperById } from '@/app/services/api/api.services';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Metadata } from 'next';
import CamperDetailsClient from './pageClient';
import { notFound } from 'next/navigation';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

type PageProps = {
  params: Promise<{ lang: string; id: string }>;
};

async function fetchCamper(id: string, queryClient?: QueryClient) {
  const camper = await getCamperById(id);

  if (queryClient) {
    await queryClient.prefetchQuery({
      queryKey: ['CamperById', id],
      queryFn: () => Promise.resolve(camper),
    });
  }

  return camper;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const camper = await fetchCamper(id);

  if (!camper) {
    return {
      title: 'Campify: Camper not found',
      description: 'The requested camper does not exist.',
    };
  }

  const title = camper.name ? `Campify: ${camper.name}` : 'Campify: camper details';
  const description = camper.description ? camper.description : 'About camper';

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
      images: camper.gallery[0].original
        ? [
            {
              url: camper.gallery[0].original,
              width: 1200,
              height: 630,
              alt: camper.name,
            },
          ]
        : undefined,
    },
  };
}

async function CamperPage({ params }: PageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  const camper = await fetchCamper(id, queryClient);

  if (!camper) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CamperDetailsClient />
    </HydrationBoundary>
  );
}

export default CamperPage;
