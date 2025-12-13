'use client';

import { CamperData } from './api/api.types';

export function animateToCart(options: {
  imageRect: DOMRect;
  cartRect: DOMRect;
  imageSrc: string;
  duration?: number; // optional user-defined duration
}) {
  const { imageRect, cartRect, imageSrc, duration } = options;

  const flyingImage = document.createElement('img');
  flyingImage.src = imageSrc;
  flyingImage.alt = 'flying-to-cart';

  flyingImage.style.position = 'fixed';
  flyingImage.style.left = imageRect.left + 'px';
  flyingImage.style.top = imageRect.top + 'px';
  flyingImage.style.width = imageRect.width + 'px';
  flyingImage.style.height = imageRect.height + 'px';
  flyingImage.style.pointerEvents = 'none';
  flyingImage.style.zIndex = '9999';
  flyingImage.style.borderRadius = '16px';
  flyingImage.style.objectFit = 'cover';

  document.body.appendChild(flyingImage);

  const translateX = cartRect.left + cartRect.width / 2 - (imageRect.left + imageRect.width / 2);
  const translateY = cartRect.top + cartRect.height / 2 - (imageRect.top + imageRect.height / 2);

  // 🔥 чиста реальна дистанція
  const distance = Math.sqrt(translateX ** 2 + translateY ** 2);

  // 🔥 авто-час (плавний на мобілках)
  let autoDuration = distance * 1.2;

  // clamp → min 450ms, max 1200ms
  autoDuration = Math.max(450, Math.min(1200, autoDuration));

  // 🔥 якщо duration передали → використовуємо його. Якщо ні — autoDuration
  const finalDuration = duration ?? autoDuration;

  const animation = flyingImage.animate(
    [
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: 'translate(0, -40px) scale(1.08)', opacity: 1, offset: 0.55 },
      {
        transform: `translate(${translateX}px, ${translateY}px) scale(0.2)`,
        opacity: 0,
        offset: 1,
      },
    ],
    {
      duration: finalDuration,
      easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      fill: 'forwards',
    }
  );

  animation.onfinish = () => flyingImage.remove();
}

export const handleFavoritesClick = (event: React.MouseEvent<HTMLButtonElement | SVGElement, MouseEvent>) => {
  const button = event.currentTarget;
  const card =
    button.closest('article') ||
    button.parentElement?.closest('article') ||
    (event.target as HTMLElement).closest('article');

  if (!card) return;

  const imgWrap = card.querySelector('[data-fav-image="image"]') as HTMLImageElement | null;

  if (!imgWrap) return;

  const imageSrc = imgWrap?.src;

  if (!imageSrc) return;

  const sourceRect = imgWrap.getBoundingClientRect();

  if (sourceRect.width === 0 || sourceRect.height === 0) {
    return;
  }

  const cartIconEl = document.querySelector('[data-fav-button="header-fav"]') as HTMLElement | null;

  if (!cartIconEl) {
    return;
  }

  const targetRect = cartIconEl.getBoundingClientRect();

  animateToCart({
    imageRect: sourceRect,
    cartRect: targetRect,
    imageSrc,
  });
};

export function createFavoriteHandler(isFavoriteFn: (id: string) => boolean, toggleFn: (item: CamperData) => void) {
  return function handleFavClick(
    favItem: CamperData,
    event: React.MouseEvent<HTMLButtonElement | SVGElement, MouseEvent>
  ) {
    if (!isFavoriteFn(favItem.id)) {
      handleFavoritesClick(event);
    }

    toggleFn(favItem);
    event.stopPropagation();
  };
}

//$ git commit -m "added: ancor to header and CardImg for image animation/ added: functionality with animation on listItemView (2)/ added: favorites animation bloc"
