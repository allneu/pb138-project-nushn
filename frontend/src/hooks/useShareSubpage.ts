import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { SubpagesApi } from '../services';
import useAuth from './useAuth';
import { ResponseMulti, RoleCreateType, SubpageType } from '../models';

const useShareSubpage = () => {
  const { auth } = useAuth();
  const { subpageId } = useParams();
  const queryClient = useQueryClient();

  const { mutateAsync: share, isLoading, isError } = useMutation({
    mutationFn: (data: RoleCreateType) => SubpagesApi.addRole(auth?.data.id || '', subpageId || '', data),
    onSuccess: () => {
      queryClient.invalidateQueries(['subpage', subpageId]);
      queryClient.setQueryData<ResponseMulti<SubpageType>>(
        ['menu'],
        (oldData) => (oldData
          ? {
            ...oldData,
            data: oldData?.data.map((subpage) => {
              if (subpage.id === subpageId) {
                return {
                  ...subpage,
                  shared: true,
                };
              }
              return subpage;
            }),
          }
          : undefined),
      );
    },
  });

  return { share, isLoading, isError };
};

export default useShareSubpage;
