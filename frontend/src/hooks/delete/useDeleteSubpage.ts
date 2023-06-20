import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { SubpagesApi } from '../../services';
import useAuth from '../useAuth';
import { ResponseMulti, SubpageType } from '../../models';

type UseDeleteSubpageProps = {
  redirect: string;
  subpageId: string;
};

const UseDeleteSubpage = ({ redirect, subpageId }: UseDeleteSubpageProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { auth } = useAuth();
  const userId = auth?.data.id;

  const deleteSubpageFC = (data: string) => SubpagesApi.deleteSingle(userId || '', data);

  const { mutateAsync: deleteSubpage } = useMutation({
    mutationFn: deleteSubpageFC,
    onSuccess: () => {
      queryClient.setQueryData<ResponseMulti<SubpageType>>(
        ['menu'],
        (oldData) => (oldData
          ? {
            ...oldData,
            data: oldData.data.filter((subpage) => subpage.id !== subpageId),
          }
          : undefined),
      );
      navigate(redirect);
    },
  });

  return { deleteSubpage };
};

export default UseDeleteSubpage;
