import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { SubpagesApi } from '../../services';
import useAuth from '../useAuth';
import { ResponseMulti, ResponseSingle, SubpageDeleteResultType, SubpageType } from '../../models';

type UseDeleteSubpageProps = {
  redirect: string;
};

const useDeleteSubpage = ({ redirect }: UseDeleteSubpageProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { auth } = useAuth();
  const userId = auth?.data.id;

  const { mutateAsync: deleteSubpage } = useMutation({
    mutationFn: (subpageId: string) => SubpagesApi.deleteSingle(userId || '', subpageId),
    onSuccess: (deletedSubpage: ResponseSingle<SubpageDeleteResultType>) => {
      queryClient.setQueryData<ResponseMulti<SubpageType>>(
        ['menu'],
        (oldData) => (oldData
          ? {
            ...oldData,
            data: oldData.data.filter((subpage) => subpage.id !== deletedSubpage.data.id),
          }
          : undefined),
      );
      navigate(redirect);
    },
  });

  return { deleteSubpage };
};

export default useDeleteSubpage;
