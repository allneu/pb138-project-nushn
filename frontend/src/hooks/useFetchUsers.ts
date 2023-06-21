import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { UsersApi } from '../services';
import { ResponseMulti, UserType } from '../models';
import useAuth from './auth/useAuth';

type UseFetchUsersProps = {
  initialSearch: string;
  initialCount: number;
};

type UseFetchUsersReturnType = {
  users: UserType[] | undefined,
  hasMore: boolean,
  updateSearch: (newSearch: string) => void,
  setCount: React.Dispatch<React.SetStateAction<number>>,
};

const useFetchUsers = ({ initialSearch, initialCount }: UseFetchUsersProps)
: UseFetchUsersReturnType => {
  const [search, setSearch] = useState(initialSearch);
  const [count, setCount] = useState(initialCount);
  const [hasMore, setHasMore] = useState(true);
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  const getUsers = () => UsersApi.getAll({ username: search, count });

  const { data: allUsers } = useQuery({
    queryKey: ['users', search, count],
    queryFn: getUsers,
    keepPreviousData: true,
    onSuccess: (newUsers: ResponseMulti<UserType>) => {
      // Check if there are no more users to be fetched
      if (newUsers.data.length < count) {
        setHasMore(false);
      }

      queryClient.setQueryData<ResponseMulti<UserType>>(
        ['users', search, count],
        (oldData) => (oldData
          ? {
            ...oldData,
            data: newUsers.data,
          }
          : undefined),
      );
    },
  });

  const updateSearch = (newSearch: string) => {
    setSearch(newSearch);
    setCount(initialCount); // Reset count when search query changes.
    setHasMore(true); // Reset hasMore when search query changes.
  };

  const users = allUsers?.data.filter((user) => user.id !== auth?.data.id);

  return {
    users, hasMore, updateSearch, setCount,
  };
};

export default useFetchUsers;
