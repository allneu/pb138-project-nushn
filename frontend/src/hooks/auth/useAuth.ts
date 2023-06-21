import { useQuery } from '@tanstack/react-query';
import { UsersApi } from '../../services';

const useAuth = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['auth'],
    retry: false,
    queryFn: () => UsersApi.auth(),
    staleTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: false,
  });

  return { auth: data, isLoading, isError };
};

export default useAuth;
