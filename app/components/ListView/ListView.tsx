'use client';

import { CamperData, CampersResponse } from '@/app/services/api/api.types';
import css from './ListView.module.css';
import { useIsMobile } from '@/app/lib/hooks/useIsMobile';
import dynamic from 'next/dynamic';
import { memo } from 'react';

type Props = {
  items: CampersResponse[]; // pages[]
  params: unknown[];
};

type PageListProps = {
  page: CampersResponse;
  isMobile: boolean;
};

// -------------------
// Memo-компонент UL
// -------------------
const PageList = memo(function PageList({ page, isMobile }: PageListProps) {
  const ListItemMobile = dynamic(() => import('../ListItem/ListItemMobile'), {
    ssr: false,
  });
  const ListItemDesktop = dynamic(() => import('../ListItem/ListItem'), {
    ssr: false,
  });

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

  return (
    <div>
      {items.map((page, pageIndex) => {
        const key = Number(params?.[pageIndex] ?? pageIndex);

        return <PageList key={key} page={page} isMobile={isMobile} />;
      })}
    </div>
  );
}

export default ListView;
