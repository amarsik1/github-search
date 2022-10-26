import FillStar from '../assets/FillStar'
import Star from '../assets/Star';

import './styles.scss';

interface Props {
  filled: boolean;
  onClick: () => void;
}

const FavoriteIcon = ({ filled, onClick }: Props) => {

  return (
    <button className='FavButton' onClick={onClick}>
      {filled ? <FillStar /> : <Star />}
    </button>
  );
}

export default FavoriteIcon;
