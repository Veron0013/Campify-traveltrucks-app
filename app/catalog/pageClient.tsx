'use client';

import { getCamperList } from '../services/api/api.services';
import toastMessage, { MyToastType } from '../services/messageService';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import MessageNoInfo from '../components/MessageNoInfo/MessageNoInfo';
import Loading from '../loading';
import ListView from '../components/ListView/ListView';
import AsideFilterView from '../components/Filter/AsideFilterView';
import { useCamperFilters } from '../stores/camperFiltersStore';
import { Button } from '../components/Button/Button';
import css from './pageClient.module.css';
import { useEffect, useState } from 'react';
import { CamperData } from '../services/api/api.types';
import { ERROR_MAIN_MESSAGE, LIMIT } from '../lib/vars';

function CatalogClientPage() {
  const filters = useCamperFilters(s => s.filters);
  const clearFilters = useCamperFilters(s => s.clearFilters);

  const [page, setPage] = useState(1);
  const [campers, setAllCampers] = useState<CamperData[]>([]);

  const { data, isFetching, isError } = useQuery({
    queryKey: ['TrackListFiltered', filters, page],
    queryFn: async () => {
      const res = await getCamperList({ ...filters, page, limit: LIMIT });
      if (!res) toastMessage(MyToastType.error, 'bad request');
      return res;
    },
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!data) {
        setAllCampers([]);
        return;
      }

      if (page === 1) {
        setAllCampers(data.items);
      } else {
        //bad indexes
        setAllCampers(prev => {
          const merged = [...prev, ...data.items];
          const unique = merged.filter((camper, index, self) => index === self.findIndex(c => c.id === camper.id));
          return unique;
        });
      }
    };
    fetchData();
  }, [data, page]);

  useEffect(() => {
    const fetchPages = async () => {
      setPage(1);
    };
    fetchPages();
  }, [filters]);

  if (isError && !filters) {
    return (
      <div className="container">
        <div className={css.pageLayout}>
          <MessageNoInfo buttonText="Go back to Home page" text={ERROR_MAIN_MESSAGE} route="/" />
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="container">
        <div className={css.pageLayout}>
          <AsideFilterView total={data?.total || 0} shown={campers.length} isFetching={isFetching} />
          <div className={css.pageContainer}>
            {!isFetching && campers.length === 0 && (
              <MessageNoInfo
                buttonText="Clear filters"
                text="No campers found. Try to clear filters."
                onClick={clearFilters}
              />
            )}
            {campers && campers.length > 0 && <ListView items={campers} />}

            {isFetching && <Loading />}
            {data && campers.length < data?.total && (
              <Button type="button" label="Load more" variant="loadMore" onClick={() => setPage(p => p + 1)} />
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default CatalogClientPage;
