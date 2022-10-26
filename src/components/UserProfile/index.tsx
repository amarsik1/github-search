import { useData } from '../../context';
import { User } from '../../interfaces';
import FavoriteIcon from '../FavoriteIcon';

import './styles.scss';

const UserProfile = () => {
  const { activeUser, checkIsFavoriteUser, toggleFavoriteUsers } = useData();
  const user = activeUser as User;

  const isFavorite = checkIsFavoriteUser(user.login);

  return (
    <div className='UserProfile'>
      <img src={user.avatar_url} alt={user.name} className='UserProfile--img' />

      <div className='UserProfile--infoWrapper'>
        <div className='UserProfile--info'>
          <span>{user.name}</span>
          <a target="__blank" href={user.html_url}>@{user.login}</a>
          <span>{user.bio}</span>
        </div>
        <div className='UserProfile--stats'>
          <div className='UserProfile--statsItem'>
            <span>Followers</span>
            <span>{user.followers}</span>
          </div>
          <div className='UserProfile--statsItem'>
            <span>Following</span>
            <span>{user.following}</span>
          </div>
          <div className='UserProfile--statsItem'>
            <span>Repositories</span>
            <span>{user.public_repos}</span>
          </div>
        </div>
      </div>
      <div className='UserProfile--favButton'>
        <FavoriteIcon filled={isFavorite} onClick={() => toggleFavoriteUsers(user)} />
      </div>
    </div>
  )
}

export default UserProfile;
