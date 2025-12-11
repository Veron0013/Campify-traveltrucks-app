'use client';
import css from '../catalog/pageClient.module.css';
import ListView from '../components/ListView/ListView';
import MessageNoInfo from '../components/MessageNoInfo/MessageNoInfo';
import { useFavoritesStore } from '../stores/campersFavoritesStore';

function FavoritesClientPage() {
  const favoriteCampers = useFavoritesStore(s => s.favorites);
  return (
    <div className="container">
      <div className={css.pageLayout}>
        {favoriteCampers.length === 0 && (
          <MessageNoInfo
            buttonText="Go to catalog"
            text="No campers found. Try to select one on catalog page."
            route="/catalog"
          />
        )}
        {favoriteCampers.length > 0 && <ListView items={favoriteCampers} />}
      </div>
    </div>
  );
}

export default FavoritesClientPage;
