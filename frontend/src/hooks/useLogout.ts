import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { UsersApi } from '../services';

type UseLoginProps = {
  redirect: string,
};

const useLogout = ({ redirect }: UseLoginProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutateAsync: logout, isLoading, isError } = useMutation({
    mutationFn: () => UsersApi.logout(),
    onSuccess: () => {
      navigate(redirect);
      queryClient.resetQueries(['auth']);
    },
  });

  return { logout, isLoading, isError };
};

export default useLogout;
