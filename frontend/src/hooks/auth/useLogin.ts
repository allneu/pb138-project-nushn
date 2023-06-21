import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { UsersApi } from '../../services';
import { UserLoginType } from '../../models';

type UseLoginProps = {
  redirect: string;
};

const useLogin = ({ redirect }: UseLoginProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutateAsync: login, isLoading, isError } = useMutation({
    mutationFn: (body: UserLoginType) => UsersApi.login(body),
    retry: false,
    onSuccess: () => {
      navigate(redirect);
      queryClient.invalidateQueries(['auth']);
    },
  });

  return { login, isLoading, isError };
};

export default useLogin;
