'use client';

import { getCamperList } from '../services/api/api.services';
import toastMessage, { MyToastType } from '../services/messageService';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import MessageNoInfo from '../components/MessageNoInfo/MessageNoInfo';
import Loading from '../loading';
import ListView from '../components/ListView/ListView';
import AsideFilterView from '../components/Filter/AsideFilterView';
import { useCamperFilters } from '../stores/camperFiltersStore';
import { Button } from '../components/Button/Button';
import css from './pageClient.module.css';
import { useEffect, useState } from 'react';
import { ERROR_MAIN_MESSAGE, LIMIT } from '../lib/vars';
import FiltersModal from '../components/Filter/FiltersModal';

function CatalogClientPage() {
  const filters = useCamperFilters(s => s.filters);
  const clearFilters = useCamperFilters(s => s.clearFilters);

  const [shown, setShown] = useState(0);
  const [total, setTotal] = useState(0);

  const [open, setOpen] = useState(false);

  const { data, isFetching, isError, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['TrackListFiltered', filters],
    retry: 0,
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getCamperList({ ...filters, page: pageParam, limit: LIMIT });
      if (!res) toastMessage(MyToastType.error, 'bad request');
      return res;
    },
    refetchOnMount: false,
    placeholderData: keepPreviousData,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.reduce((acc, p) => acc + p.items.length, 0);

      if (loaded >= lastPage.total) return undefined;
      return allPages.length + 1;
    },
  });

  useEffect(() => {
    if (!data?.pages) return;
    const fetchData = async () => {
      const firstPage = data.pages[0];
      const t = firstPage?.total ?? 0;
      const s = data.pages.reduce((acc, p) => acc + p.items.length, 0);

      setTotal(t);
      setShown(s);
    };
    fetchData();
  }, [data]);

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
    <div className="container">
      <div className={css.pageLayout}>
        <div className={css.mobileFiltersButton}>
          <Button type="button" label="Filters" variant="loadMore" onClick={() => setOpen(true)} />
        </div>
        <div className={css.desktopFilters}>
          <AsideFilterView total={total || 0} shown={shown} isFetching={isFetching} />
        </div>
        <div className={css.pageContainer}>
          {!isFetching && !data?.pages && (
            <MessageNoInfo
              buttonText="Clear filters"
              text="No campers found. Try to clear filters."
              onClick={clearFilters}
            />
          )}

          {data?.pages && <ListView items={data.pages} params={data.pageParams} />}

          {isFetching && <Loading />}

          {data?.pages && hasNextPage && (
            <Button type="button" label="Load more" variant="loadMore" onClick={fetchNextPage} />
          )}
        </div>
        <FiltersModal open={open} onClose={() => setOpen(false)} shown={shown} total={total} isFetching={isFetching} />
      </div>
    </div>
  );
}

export default CatalogClientPage;
