import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { SubpagesApi } from '../../services';
import useAuth from '../useAuth';
import { ResponseMulti, SubpageType } from '../../models';

type UseDeleteSubpageProps = {
  redirect: string;
};

const UseDeleteSubpage = ({ redirect }: UseDeleteSubpageProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { subpageId } = useParams();
  const { auth } = useAuth();
  const userId = auth?.data.id;

  const deleteSubpageFC = () => SubpagesApi.deleteSingle(userId || '', subpageId || '');

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
