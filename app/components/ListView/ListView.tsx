import { CamperData } from '@/app/services/api/api.types';
import css from './ListView.module.css';
import ListItem from '../ListItem/ListItem';

type Props = {
  items: CamperData[];
};

function ListView({ items }: Props) {
  return (
    <div>
      <ul className={css.listStyle}>
        {items.map((item: CamperData) => {
          return (
            <li key={item.id} id={item.id.toString()}>
              <ListItem item={item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ListView;
