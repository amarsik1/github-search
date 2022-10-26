import React from 'react'
import { useData } from '../../context';
import { User } from '../../interfaces';
import FavoriteIcon from '../FavoriteIcon';

interface Props {
  user: User;
}

const UserListItem = ({ user }: Props) => {
  const { setActiveUser, toggleFavoriteUsers, checkIsFavoriteUser } = useData();

  const isFavorite = checkIsFavoriteUser(user.login);

  return (
    <div>
      <button onClick={() => setActiveUser(user)}>
        <p>{user.login}</p>
      </button>

      <FavoriteIcon filled={isFavorite} onClick={() => toggleFavoriteUsers(user)} />
    </div>
  )
}

export default UserListItem