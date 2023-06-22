import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { LabelsApi } from '../../services';
import {
  LabelWithTasksType, ResponseMulti, ResponseSingle, LabelDeleteResultType,
} from '../../models';

type UseDeleteLabelProps = {
  redirect: string;
};

const useDeleteLabel = ({ redirect }: UseDeleteLabelProps) => {
  const queryClient = useQueryClient();
  const { subpageId } = useParams();
  const navigate = useNavigate();

  const { mutateAsync: deleteLabel } = useMutation({
    mutationFn: (labelId: string) => LabelsApi.deleteSingle(subpageId || '', labelId),
    onSuccess: (deletedLabel: ResponseSingle<LabelDeleteResultType>) => {
      queryClient.setQueryData<ResponseMulti<LabelWithTasksType>>(
        ['subpage', subpageId, 'labelsWithTasks'],
        (oldData) => (oldData
          ? {
            ...oldData,
            data: oldData.data.filter((label) => label.id !== deletedLabel.data.labelId),
          }
          : undefined),
      );
      navigate(redirect);
    },
  });

  return { deleteLabel };
};

export default useDeleteLabel;
