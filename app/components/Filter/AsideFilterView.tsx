import { CamperForm } from '@/app/services/api/api.types';
import css from './AsideFilterView.module.css';
import { FeatureConfig, FeatureKey, FEATURES_CONFIG, FORM_CONFIG } from '@/app/types/filter.types';
import FilterButton from './FilterButton';
import { useCamperFilters } from '@/app/stores/camperFiltersStore';

function AsideFilterView() {
  const filters = useCamperFilters(s => s.filters);

  const setFilter = useCamperFilters(s => s.setFilter);
  //const clearFilters = useCamperFilters(s => s.clearFilters);

  return (
    <aside className={css.aside}>
      {/*<div className="container">*/}

      {FEATURES_CONFIG.form.values!.map(value => {
        const v = value as CamperForm;
        const cfg = FORM_CONFIG[v];

        return (
          <FilterButton
            key={value}
            icon={cfg.icon}
            label={cfg.label}
            active={filters.form === value}
            onClick={() => setFilter('form', value)}
          />
        );
      })}
      {(Object.entries(FEATURES_CONFIG) as [FeatureKey, FeatureConfig][]).map(([key, cfg]) => {
        if (cfg.values) return null;

        return (
          <FilterButton
            key={key}
            icon={cfg.icon!}
            label={cfg.label}
            active={!!filters[key]}
            onClick={() => setFilter(key, !filters[key])}
          />
        );
      })}
      {/*</div>*/}
    </aside>
  );
}

export default AsideFilterView;
