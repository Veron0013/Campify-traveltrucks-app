import { CamperData } from '@/app/services/api/api.types';
import Image from 'next/image';
import Link from 'next/link';
import css from './ListItem.module.css';
import IconComponent from '../Icon/Icon.component';
import { Button } from '../Button/Button';
import { CARD_FEATURES_CONFIG } from '@/app/types/filter.types';
import { FeatureTag } from '../FeatureTag/FeatureTag';
import { useFavoritesStore } from '@/app/stores/campersFavoritesStore';
import { createFavoriteHandler } from '@/app/services/animateFavorites';

interface ItemProps {
  item: CamperData;
}

function ListItem({ item }: ItemProps) {
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  const handleFavClick = createFavoriteHandler(isFavorite, toggleFavorite);

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
            data-fav-image="image"
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
              size={40}
              onClick={e => handleFavClick(item, e)}
            />
          </div>
        </div>

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

        <div className={css.descriptionBox} aria-label="Description">
          <p className={css.description}>{item.description}</p>
        </div>

        <div className={css.features}>
          {CARD_FEATURES_CONFIG.filter(f => item[f.key] !== undefined && item[f.key] !== false).map(f => (
            <FeatureTag key={f.key} icon={f.icon(item[f.key] as never)} label={f.label(item[f.key] as never)} />
          ))}
        </div>

        <div className={css.cardActions}>
          <Button href={`/catalog/${item.id}`} className={css.cardCta} label="Show more" />
        </div>
      </div>
    </article>
  );
}

export default ListItem;
