'use client';
import { CamperData } from '@/app/services/api/api.types';
import css from './ListView.module.css';
import { useIsMobile } from '@/app/lib/hooks/useIsMobile';
import dynamic from 'next/dynamic';

type Props = {
  items: CamperData[];
};

function ListView({ items }: Props) {
  const ListItemMobile = dynamic(() => import('../ListItem/ListItemMobile'), {
    ssr: false,
  });
  const ListItemDesktop = dynamic(() => import('../ListItem/ListItem'), {
    ssr: false,
  });

  const isMobile = useIsMobile(1440);
  return (
    <div>
      <ul className={css.listStyle}>
        {items.map((item: CamperData) => {
          return (
            <li key={item.id} id={item.id.toString()}>
              {isMobile ? <ListItemMobile item={item} /> : <ListItemDesktop item={item} />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ListView;
