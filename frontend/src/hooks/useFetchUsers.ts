// hooks/useFetchUsers.js
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { UsersApi } from '../services';
import { ResponseMulti, UserType } from '../models';

type UseFetchUsersProps = {
  initialSearch: string;
  initialCount: number;
};

type UseFetchUsersReturnType = [
  ResponseMulti<UserType> | undefined,
  (newSearch: string) => void,
  number,
  React.Dispatch<React.SetStateAction<number>>,
];

const useFetchUsers = ({ initialSearch, initialCount }
: UseFetchUsersProps): UseFetchUsersReturnType => {
  const [search, setSearch] = useState(initialSearch);
  const [count, setCount] = useState(initialCount);

  const getUsers = () => UsersApi.getAll({ username: search, count });

  const { data: users } = useQuery({
    queryKey: ['users', search, count],
    queryFn: getUsers,
  });

  const updateSearch = (newSearch: string) => {
    setSearch(newSearch);
    setCount(initialCount); // Reset count when search query changes.
  };

  return [users, updateSearch, count, setCount];
};

export default useFetchUsers;
