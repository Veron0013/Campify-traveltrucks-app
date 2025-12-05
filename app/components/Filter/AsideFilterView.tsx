'use client';

import { CamperForm } from '@/app/services/api/api.types';
import css from './AsideFilterView.module.css';
import { FeatureConfig, FeatureKey, FILTERS_CONFIG, FORM_CONFIG } from '@/app/types/filter.types';
import FilterButton from './FilterButton';
import { useCamperFilters } from '@/app/stores/camperFiltersStore';
import { Button } from '../Button/Button';
import LocationBlock from './LocationBlock';

interface Props {
  total: number;
  shown: number;
  isFetching: boolean;
}

function AsideFilterView({ shown, total, isFetching }: Props) {
  const filters = useCamperFilters(s => s.filters);
  const setFilter = useCamperFilters(s => s.setFilter);
  const clearFilters = useCamperFilters(s => s.clearFilters);

  return (
    <aside className={css.aside}>
      <h3 className={css.locationTitle}>Location</h3>
      <LocationBlock />

      <div className={css.filters}>
        {isFetching ? (
          <h3 className={css.sectionTitle}>Filters: </h3>
        ) : (
          <h3 className={css.sectionTitle}>{`Filters: result ${shown} from ${total}`}</h3>
        )}

        <div className={css.block}>
          <h4 className={css.blockTitle}>Vehicle equipment</h4>
          <div className={css.divider}></div>

          <div className={css.grid}>
            {(Object.entries(FILTERS_CONFIG) as [FeatureKey, FeatureConfig][]).map(([key, cfg]) => (
              <FilterButton
                key={key}
                icon={cfg.icon}
                label={cfg.label}
                active={!!filters[key]}
                onClick={() => setFilter(key, !filters[key])}
              />
            ))}
          </div>
        </div>

        <div className={css.block}>
          <h4 className={css.blockTitle}>Vehicle type</h4>
          <div className={css.divider}></div>

          <div className={css.grid}>
            {Object.entries(FORM_CONFIG).map(([value, cfg]) => (
              <FilterButton
                key={value}
                icon={cfg.icon}
                label={cfg.label}
                active={filters.form === value}
                onClick={() => setFilter('form', value as CamperForm)}
              />
            ))}
          </div>
        </div>
      </div>
      <Button type="button" label="Clear filters" variant="loadMore" onClick={clearFilters} />
    </aside>
  );
}

export default AsideFilterView;
