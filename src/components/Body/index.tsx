import { UIEvent, useCallback, useEffect } from 'react';
import { getUsers } from '../../api';
import { USER_PER_PAGE } from '../../constants';
import { useData } from '../../context';
import UserListItem from '../UserListItem';
import UserProfile from '../UserProfile';

import './styles.scss';

const Body = () => {
  const {
    users,
    showOnlyFavorites,
    activeUser,
    setPage,
    page,
    inputValue,
    searchUsersTotal,
    setSearchUsers,
  } = useData();

  useEffect(() => {
    if (!showOnlyFavorites && !users.length) {
      setPage(1);
    }
  }, [users, showOnlyFavorites, setPage]);

  const handleGetUsers = useCallback(async ({ currentTarget }: UIEvent<HTMLDivElement>) => {
    const isAllUsersLoaded = searchUsersTotal === users.length;
    const isScrollBottom = currentTarget?.scrollHeight > currentTarget.scrollTop + currentTarget.clientHeight;

    if (!isScrollBottom && isAllUsersLoaded) {
      return;
    }
    
    const response = await getUsers(inputValue, USER_PER_PAGE, page + 1);
    setPage((prev) => prev + 1);
    setSearchUsers((prev) => {
      const existUsersLogin = prev.map(({login}) => login);
      const filteredUsers = response.items.filter((newUser) => (
        !existUsersLogin.includes(newUser.login)
      ));
      
      return [
        ...prev,
        ...filteredUsers,
      ];
    });
  }, [inputValue, page, searchUsersTotal, users, setPage, setSearchUsers]);
  
  return (
    <div className="Body">
      <div className="container Body--container">
        {activeUser && (
          <UserProfile />
        )}

        <div className='Body--usersList' onScroll={handleGetUsers}>
          {!activeUser && users.map((user) => (
            <UserListItem key={user.login} user={user} />
          ))}
        </div>        
      </div>
    </div>
  );
};

export default Body;
