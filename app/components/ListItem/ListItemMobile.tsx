'use client';

import Image from 'next/image';
import Link from 'next/link';
import css from './ListItemMobile.module.css';
import IconComponent from '../Icon/Icon.component';
import { Button } from '../Button/Button';
import { CARD_FEATURES_CONFIG } from '@/app/types/filter.types';
import { FeatureTag } from '../FeatureTag/FeatureTag';
import { useFavoritesStore } from '@/app/stores/campersFavoritesStore';
import { CamperData } from '@/app/services/api/api.types';

interface ItemProps {
  item: CamperData;
}

export default function ListItemMobile({ item }: ItemProps) {
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  return (
    <article className={css.card}>
      <Link href={`/catalog/${item.id}`}>
        <div className={css.imageBox}>
          <Image src={item.gallery[0].thumb} alt={item.name} fill className={css.image} loading="lazy" />

          <h3 className={css.title}>{item.name}</h3>

          <div className={css.priceBlock}>
            <span className={css.price}>{`€${item.price.toFixed(2)}`}</span>
          </div>
        </div>
      </Link>

      <div className={css.metaBlock}>
        <div className={css.meta}>
          <div className={css.rate}>
            <IconComponent name="star-filled" size={18} />
            {item.rating} ({item.reviews.length} Reviews)
          </div>

          <div className={css.location}>
            <IconComponent name="map" size={18} isMap />
            {item.location}
          </div>
        </div>
        <IconComponent
          name={isFavorite(item.id) ? 'heart-filled' : 'heart'}
          size={40}
          onClick={() => toggleFavorite(item)}
        />
      </div>

      <div className={css.descriptionBox} aria-label="Description">
        <p className={css.description}>{item.description}</p>
      </div>

      <div className={css.features}>
        {CARD_FEATURES_CONFIG.filter(f => item[f.key] !== undefined && item[f.key] !== false).map(f => (
          <FeatureTag key={f.key} icon={f.icon(item[f.key] as never)} label={f.label(item[f.key] as never)} />
        ))}
      </div>

      <Button href={`/catalog/${item.id}`} label="Show more" />
    </article>
  );
}
