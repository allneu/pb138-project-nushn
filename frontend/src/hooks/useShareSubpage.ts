import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { SubpagesApi } from '../services';
import useAuth from './useAuth';
import { RoleCreateType } from '../models';

const useShareSubpage = () => {
  const { auth } = useAuth();
  const { subpageId } = useParams();

  const { mutateAsync: share, isLoading, isError } = useMutation({
    mutationFn: (data: RoleCreateType) => SubpagesApi.addRole(auth?.data.id || '', subpageId || '', data),
  });

  return { share, isLoading, isError };
};

export default useShareSubpage;
