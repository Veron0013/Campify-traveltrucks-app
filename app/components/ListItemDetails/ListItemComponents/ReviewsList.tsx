import { CamperReview } from '@/app/services/api/api.types';
import css from './CamperDetails.module.css';
import IconComponent from '../../Icon/Icon.component';
import MessageNoInfo from '../../MessageNoInfo/MessageNoInfo';
import toastMessage, { MyToastType } from '@/app/services/messageService';

interface Props {
  reviews: CamperReview[];
}

function ReviewsList({ reviews }: Props) {
  const handleAddComment = () => {
    toastMessage(MyToastType.loading, 'Sorry, this feature under maintenance');
  };
  if (!reviews.length)
    return (
      <MessageNoInfo
        buttonText="Add a comment"
        text="No comments yet. Maybe you can add yours?"
        onClick={handleAddComment}
      />
    );
  return (
    <div>
      <ul className={css.reviewList}>
        {reviews.map((item: CamperReview, index) => {
          return (
            <li key={item.reviewer_name + index} className={css.reviewCard}>
              <div className={css.reviewHeader}>
                <div className={css.avatar}>{item.reviewer_name.charAt(0).toUpperCase()}</div>

                <div className={css.headerInfo}>
                  <p className={css.name}>{item.reviewer_name}</p>

                  <div className={css.stars}>
                    {Array.from({ length: 5 }).map((_, i) => {
                      const diff = (item.reviewer_rating ?? 0) - i;
                      return diff > 0 ? (
                        <IconComponent key={i} name="star-filled" size={16} />
                      ) : (
                        <IconComponent key={i} name="star" size={16} />
                      );
                    })}
                  </div>
                </div>
              </div>

              <p className={css.comment}>{item.comment}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ReviewsList;
