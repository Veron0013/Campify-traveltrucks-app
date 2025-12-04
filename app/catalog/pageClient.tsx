'use client';

import { getCatalogList } from '../services/api/api.services';
import toastMessage, { MyToastType } from '../services/messageService';
import { useQuery } from '@tanstack/react-query';
import MessageNoInfo from '../components/MessageNoInfo/MessageNoInfo';
import Loading from '../loading';
import ListView from '../components/ListView/ListView';
import AsideFilterView from '../components/Filter/AsideFilterView';
import { useCamperFilters } from '../stores/camperFiltersStore';
import { useCampersStore } from '../stores/campersListStore';
import { Button } from '../components/Button/Button';
import css from './pageClient.module.css';

function CatalogClientPage() {
  const filters = useCamperFilters(s => s.filters);
  const clearFilters = useCamperFilters(s => s.clearFilters);

  const resetResults = useCampersStore(s => s.resetResults);
  const setCampers = useCampersStore(s => s.setCampers);

  const { campers, visibleCount, showMore } = useCampersStore();

  const visibleCampers = campers.slice(0, visibleCount);

  const { data, isLoading } = useQuery({
    queryKey: ['TrackListFiltered', filters],
    queryFn: async () => {
      resetResults();

      const res = await getCatalogList(filters);
      if (!res) toastMessage(MyToastType.error, 'bad request');

      setCampers(res.items);
      return res;
    },
    refetchOnMount: false,
  });

  return (
    <section className="container">
      <AsideFilterView />
      <div className={css.pageContainer}>
        {!isLoading && campers.length === 0 && (
          <MessageNoInfo
            buttonText="Clear filters"
            text="No campers found. Try to clear filters."
            onClick={clearFilters}
          />
        )}
        {data && data?.items.length > 0 && <ListView items={visibleCampers} />}

        {isLoading && <Loading />}
        {visibleCount < campers.length && (
          <Button type="button" label="Load more" variant="loadMore" onClick={() => showMore()} />
        )}
      </div>
    </section>
  );
}

export default CatalogClientPage;
