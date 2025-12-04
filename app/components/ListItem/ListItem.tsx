import { CamperData } from '@/app/services/api/api.types';
import Image from 'next/image';
import Link from 'next/link';
import css from './ListItem.module.css';
import IconComponent from '../Icon/Icon.component';
import { Button } from '../Button/Button';
import { FeatureConfig, FeatureKey, FEATURES_CONFIG } from '@/app/types/filter.types';
import { FeatureTag } from '../FeatureTag/FeatureTag';
import { useFavoritesStore } from '@/app/stores/campersFavoritesStore';

interface ItemProps {
  item: CamperData;
}

function ListItem({ item }: ItemProps) {
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  return (
    <article className={css.card} data-card="camper-card">
      <Link href={`/catalog/${item.id}`} className={css.cardImgLink}>
        <div className={css.cardImgWrap}>
          <Image
            src={item.gallery[0].thumb}
            alt={item.name}
            width={292}
            height={320}
            className={css.cardImg}
            loading="lazy"
          />
        </div>
      </Link>

      <div className={css.cardBottom}>
        <div className={css.header}>
          <h3 className={css.cardTitle}>{item.name}</h3>
          <div className={css.header_left}>
            <p className={css.cardPrice}>{`€${item.price.toFixed(2)}`}</p>
            <IconComponent
              name={isFavorite(item.id) ? 'heart-filled' : 'heart'}
              size={20}
              onClick={() => toggleFavorite(item)}
            />
          </div>
        </div>

        <div className={css.metaRow} role="group" aria-label="Rating and location">
          <div className={css.itemRates}>
            <IconComponent name="star-filled" size={20} />
            <span className={css.metaStat}>{item.rating ?? 0}</span>
            <span className={css.metaStat}>{`(${item.reviews.length ?? 0} Reviews)`}</span>
          </div>

          <div className={css.itemLocation}>
            <IconComponent name="map" size={20} isMap />
            <span className={css.locationText}>{item.location}</span>
          </div>
        </div>

        <div className={css.descriptionBox} aria-label="Description">
          <p className={css.description}>{item.description}</p>
        </div>

        <div className={css.features}>
          {(Object.entries(FEATURES_CONFIG) as [FeatureKey, FeatureConfig][])
            .filter(([key, cfg]) => {
              if (!cfg.values) return item[key] === true; // boolean
              return item[key] !== undefined; // select (engine, etc.)
            })
            .map(([key, cfg]) => (
              <FeatureTag key={key} icon={cfg.icon!} label={cfg.values ? item[key]! : cfg.label} disabled />
            ))}
        </div>

        <div className={css.cardActions}>
          <Button href={`/goods/${item.id}`} className={css.cardCta} label="Show more" />
        </div>
      </div>
    </article>
  );
}

export default ListItem;
