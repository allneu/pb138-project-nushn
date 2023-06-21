import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { LabelsApi } from '../../services';
import { LabelWithTasksType, ResponseMulti, ResponseSingle, LabelDeleteResultType } from '../../models';

const useDeleteLabel = () => {
  const queryClient = useQueryClient();
  const { subpageId } = useParams();

  const { mutateAsync: deleteLabel } = useMutation({
    mutationFn: (labelId: string) => LabelsApi.deleteSingle(subpageId || '', labelId),
    onSuccess: (deletedLabel: ResponseSingle<LabelDeleteResultType>) => {
      queryClient.setQueryData<ResponseMulti<LabelWithTasksType>>(
        ['subpage', subpageId, 'labelsWithTasks'],
        (oldData) => (oldData
          ? {
            ...oldData,
            data: oldData.data.filter((label) => label.id !== deletedLabel.data.id),
          }
          : undefined),
      );
    },
  });

  return { deleteLabel };
};

export default useDeleteLabel;
