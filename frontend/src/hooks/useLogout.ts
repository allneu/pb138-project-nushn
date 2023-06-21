import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { UsersApi } from '../services';

const useLogout = () => {
  const navigate = useNavigate();

  const { mutateAsync: logout, isLoading, isError } = useMutation({
    mutationFn: () => UsersApi.logout(),
    onSuccess: () => {
      navigate('/logout');
    },
  });

  return { logout, isLoading, isError };
};

export default useLogout;
