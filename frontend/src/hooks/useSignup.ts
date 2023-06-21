import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { UsersApi } from '../services';
import { UserCreateType } from '../models';

type UseRegisterProps = {
  redirect: string;
};

const useSignup = ({ redirect }: UseRegisterProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutateAsync: signup, isLoading, isError } = useMutation({
    mutationFn: (body: UserCreateType) => UsersApi.addSingle(body),
    retry: false,
    onSuccess: () => {
      navigate(redirect);
      queryClient.invalidateQueries(['auth']);
    },
  });

  return { signup, isLoading, isError };
};

export default useSignup;
