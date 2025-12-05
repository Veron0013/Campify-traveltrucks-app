import { GalleryImage } from '@/app/services/api/api.types';
import Image from 'next/image';
import css from './CamperDetails.module.css';

interface Props {
  images: GalleryImage[];
  title: string;
}
function CamperGallery({ images, title }: Props) {
  return (
    <div>
      <ul className={css.listStyle}>
        {images.map((item: GalleryImage, index) => {
          return (
            <li key={index}>
              <div className={css.cardImgWrap}>
                <Image
                  src={item.original}
                  alt={title}
                  width={292}
                  height={320}
                  className={css.cardImg}
                  loading="lazy"
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CamperGallery;
