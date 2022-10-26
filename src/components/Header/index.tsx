import { useEffect, useMemo } from 'react';
import { useData } from '../../context';
import ArrowBack from '../assets/ArrowBack';
import debounce from 'lodash.debounce';
import Search from '../assets/Search';
import { getUsers } from '../../api';
import FavoriteIcon from '../FavoriteIcon';
import { USER_PER_PAGE } from '../../constants';

import './styles.scss';

const Header = () => {  
  const {
    activeUser,
    showOnlyFavorites,
    inputValue,
    setInputValue,
    setSearchUsers,
    setSearchUsersTotal,
    setShowOnlyFavorites,
    setActiveUser,
  } = useData();

  useEffect(() => {
    const handleGetData = async () => {
      if (!inputValue) {
        setSearchUsers([]);
        setSearchUsersTotal(0);
        return;
      }

      const response = await getUsers(inputValue, USER_PER_PAGE);

      setSearchUsers(response.items);
      setSearchUsersTotal(response.total_count);
    };
    
    handleGetData();
  }, [inputValue]);

  const headerTitle = useMemo(() => {
    if (activeUser) return `@${activeUser.login}`;
    if (showOnlyFavorites) return 'Favorite';

    return '';
  }, [activeUser, showOnlyFavorites]);

  const toggleFavorites = () => {
    setShowOnlyFavorites((prev) => !prev);
  };
  
  const handleChangeInputValue = debounce(setInputValue, 1000);

  return (
    <div className='Header'>
      <div className='container Header--container'>
        <label className='Header--leftSide'>
          <div className='Header--icon'>
            {headerTitle ? (
              <button onClick={() => {
                setShowOnlyFavorites(false);
                setActiveUser(null)
              }}>
                <ArrowBack />
              </button>
            ) : (
              <Search />
            )}
          </div>

          <div className='Header--content'>
            {headerTitle || (
              <input defaultValue={inputValue} onChange={({ target: {value}} ) => handleChangeInputValue(value)} />
            )}
          </div>
        </label>
        
        <div className='Header--favoriteIcon'>
          {!activeUser && (
            <FavoriteIcon filled={showOnlyFavorites} onClick={toggleFavorites} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
