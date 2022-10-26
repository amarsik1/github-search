import {
  useContext,
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useMemo,
  useCallback,
} from 'react';
import { ActiveUser, User } from './interfaces';

export interface DataProvider {
  users: User[];
  toggleFavoriteUsers: (user: User) => void;
  setActiveUser: Dispatch<SetStateAction<ActiveUser>>
  activeUser: ActiveUser;
  setSearchUsers: Dispatch<SetStateAction<User[]>>
  showOnlyFavorites: boolean;
  setShowOnlyFavorites: Dispatch<SetStateAction<boolean>>;
  searchUsersTotal: number;
  setSearchUsersTotal: Dispatch<SetStateAction<number>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  clearAll: () => void;
  checkIsFavoriteUser: (login: string) => boolean;
}

export const dataContext = createContext<DataProvider>({} as DataProvider);

export const useData = () => useContext<DataProvider>(dataContext);

export function useProvideData(): DataProvider {
  const [inputValue, setInputValue] = useState('');
  const [favoritesUsers, setFavoritesUsers] = useState<User[]>([]);
  const [activeUser, setActiveUser] = useState<ActiveUser>(null);
  const [searchUsers, setSearchUsers] = useState<User[]>([]);
  const [searchUsersTotal, setSearchUsersTotal] = useState<number>(0);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const storageData = localStorage.getItem('favoritesUsers');

    setFavoritesUsers(storageData ? JSON.parse(storageData) : [])
  }, []);

  const checkIsFavoriteUser = useCallback((login: string): boolean => {
    return favoritesUsers.some(user => user.login === login);
  }, [favoritesUsers]);  

  useEffect(() => {
    localStorage.setItem('favoritesUsers', JSON.stringify(favoritesUsers))
  }, [favoritesUsers]);

  const toggleFavoriteUsers = (user: User) => {
    setFavoritesUsers((prev) => {
      const isExist = prev.some((innerUser: User) => innerUser.login === user.login);

      return isExist
        ? prev.filter((innerUser: User) => innerUser.login !== user.login)
        : [...prev, user];
    });
  };

  const showUsers = useMemo(() => {
    return showOnlyFavorites ? favoritesUsers : searchUsers;
  }, [
    favoritesUsers,
    searchUsers,
    showOnlyFavorites,
  ]);

  const clearAll = () => {
    setActiveUser(null);
    setSearchUsers([]);
    setSearchUsersTotal(0);
    setShowOnlyFavorites(false);
  }

  return {
    users: showUsers,
    activeUser,
    setSearchUsers: setSearchUsers,
    toggleFavoriteUsers,
    setActiveUser,
    showOnlyFavorites,
    setShowOnlyFavorites,
    searchUsersTotal,
    setSearchUsersTotal,
    checkIsFavoriteUser,
    clearAll,
    page,
    setPage,
    inputValue,
    setInputValue,
  };
}
