import css from './CamperDetails.module.css';
import IconComponent from '../../Icon/Icon.component';
import { CamperData } from '@/app/services/api/api.types';

interface Props {
  item: CamperData;
}

function CamperHeader({ item }: Props) {
  return (
    <div className={css.header}>
      <h3 className={css.cardTitle}>{item.name}</h3>
      <div className={css.metaRow} role="group" aria-label="Rating and location">
        <div className={css.itemRates}>
          <IconComponent name="star-filled" size={20} />
          <span className={css.metaStat}>{`${item.rating ?? 0}(${item.reviews.length ?? 0} Reviews)`}</span>
        </div>

        <div className={css.itemLocation}>
          <IconComponent name="map" size={20} isMap />
          <span className={css.locationText}>{item.location}</span>
        </div>
      </div>
      <p className={css.cardPrice}>{`€${item.price.toFixed(2)}`}</p>
    </div>
  );
}

export default CamperHeader;
