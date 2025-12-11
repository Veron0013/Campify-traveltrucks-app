'use client';
import { CamperData, CampersResponse } from '@/app/services/api/api.types';
import css from './ListView.module.css';
import { useIsMobile } from '@/app/lib/hooks/useIsMobile';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import Loading from '@/app/loading';

type Props = {
  items: (CampersResponse | CamperData)[];
  params?: unknown[];
};

const ListItemMobile = dynamic(() => import('../ListItem/ListItemMobile'), {
  ssr: false,
  loading: () => <Loading />,
});
const ListItemDesktop = dynamic(() => import('../ListItem/ListItem'), {
  ssr: false,
  loading: () => <Loading />,
});

// ---- memo-сторінка для infinite режиму ----
const PageList = memo(function PageList({ page, isMobile }: { page: CampersResponse; isMobile: boolean }) {
  return (
    <ul className={css.listStyle}>
      {page.items.map((item: CamperData) => (
        <li key={item.id} id={item.id.toString()}>
          {isMobile ? <ListItemMobile item={item} /> : <ListItemDesktop item={item} />}
        </li>
      ))}
    </ul>
  );
});

function ListView({ items, params }: Props) {
  const isMobile = useIsMobile(1440);

  if (!items || items.length === 0) return null;
  const isPaged = 'items' in (items[0] as CampersResponse);

  if (!isPaged) {
    const campers = items as CamperData[];

    return (
      <ul className={css.listStyle}>
        {campers.map(item => (
          <li key={item.id} id={item.id.toString()}>
            {isMobile ? <ListItemMobile item={item} /> : <ListItemDesktop item={item} />}
          </li>
        ))}
      </ul>
    );
  }

  // ---- РЕЖИМ CATALOG: сторінки (CampersResponse[]) ----
  const pages = items as CampersResponse[];

  return (
    <div>
      {pages.map((page, pageIndex) => {
        const key = Number(params?.[pageIndex] ?? pageIndex);

        return <PageList key={key} page={page} isMobile={isMobile} />;
      })}
    </div>
  );
}

export default ListView;
