'use client';
import MessageNoInfo from '@/app/components/MessageNoInfo/MessageNoInfo';
import { getCamperById } from '@/app/services/api/api.services';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import css from './pageClient.module.css';
import Loading from '@/app/loading';
import { ERROR_MAIN_MESSAGE } from '@/app/lib/vars';

function CamperDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const { data, isFetching, isError } = useQuery({
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

  if (isFetching || !data) {
    return (
      <div className="container">
        <Loading />
      </div>
    );
  }

  return (
    <section className="container">
      <div className={css.pageLayout}>
        <h1>{data.name}</h1>
        <p>{data.description}</p>
      </div>
    </section>
  );
}

export default CamperDetailsClient;
