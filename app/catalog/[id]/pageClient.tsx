'use client';
import MessageNoInfo from '@/app/components/MessageNoInfo/MessageNoInfo';
import { getCamperById } from '@/app/services/api/api.services';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import css from './pageClient.module.css';
import Loading from '@/app/loading';
import { ERROR_MAIN_MESSAGE } from '@/app/lib/vars';
import CamperHeader from '@/app/components/ListItemDetails/ListItemComponents/CamperHeader';
import CamperGallery from '@/app/components/ListItemDetails/ListItemComponents/CamperGallery';
import { useState } from 'react';
import FeaturesList from '@/app/components/ListItemDetails/ListItemComponents/FeaturesList';
import ReviewsList from '@/app/components/ListItemDetails/ListItemComponents/ReviewsList';
import { BookingForm } from '@/app/components/ListItemDetails/ListItemComponents/BookingForm';

function CamperDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const [activeTab, setActiveTab] = useState<'features' | 'reviews'>('features');

  const {
    data: camper,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['CamperById', id],
    queryFn: () => getCamperById(id),
    refetchOnMount: true,
  });

  if (isError) {
    return (
      <div className="container">
        <MessageNoInfo buttonText="Go back to catalog" text={ERROR_MAIN_MESSAGE} route="/catalog" />
      </div>
    );
  }

  if (isFetching || !camper) {
    return (
      <div className="container">
        <Loading />
      </div>
    );
  }

  return (
    <section className="container">
      <div className={css.pageLayout}>
        <div className={css.headerBlock}>
          <CamperHeader item={camper} />
          <CamperGallery images={camper.gallery} title={camper.name} />
          <p className={css.description}>{camper.description}</p>
        </div>
        <div className={css.tabs}>
          <button
            className={`${css.tab} ${activeTab === 'features' ? css.active : ''}`}
            onClick={() => setActiveTab('features')}
          >
            Features
          </button>

          <button
            className={`${css.tab} ${activeTab === 'reviews' ? css.active : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </div>

        <div className={css.bottomTabs}>
          <div className={css.tabContent}>
            {activeTab === 'features' && <FeaturesList camper={camper} />}
            {activeTab === 'reviews' && <ReviewsList reviews={camper.reviews} />}
          </div>
          <BookingForm camper={camper} />
        </div>
      </div>
    </section>
  );
}

export default CamperDetailsClient;
