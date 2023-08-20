import cn from 'classnames';
import { AppRoute, AuthorizationStatus } from '../../const';
import { changeFavoriteOfferStatusAction } from '../../store/api-actions';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { useNavigate } from 'react-router-dom';

type BookmarkButtonProps = {
  offerId: string;
  isFavorite: boolean;
  variant: 'place-card' | 'offer';
  width: number;
  height: number;
}

function BookmarkButton({offerId, isFavorite, variant, width, height}: BookmarkButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();

  const classList = useMemo(() => cn(
    `${variant}__bookmark-button`,
    'button',
    {'place-card__bookmark-button--active': isFavorite},
  ), [ variant, isFavorite ]);

  const handleFavoriteStatusClick = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(changeFavoriteOfferStatusAction({
        offerId: offerId,
        status: Number(!isFavorite ? 1 : 0),
      }));
    } else {
      navigate(AppRoute.Login);
    }
  };

  return (
    <button
      className={classList}
      type="button"
      onClick={handleFavoriteStatusClick}
    >
      <svg className="place-card__bookmark-icon" width={width} height={height}>
        <use xlinkHref="#icon-bookmark"/>
      </svg>
      <span className="visually-hidden">In bookmarks</span>
    </button>
  );
}

export default BookmarkButton;
