import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { LabelsApi } from '../../services';
import { LabelWithTasksType, ResponseMulti } from '../../models';

type UseDeleteLabelProps = {
  labelId: string;
};

const UseDeleteLabel = ({ labelId }: UseDeleteLabelProps) => {
  const queryClient = useQueryClient();
  const { subpageId } = useParams();

  const deleteLabelFC = () => LabelsApi.deleteSingle(subpageId || '', labelId);

  const { mutateAsync: deleteLabel } = useMutation({
    mutationFn: deleteLabelFC,
    onSuccess: () => {
      queryClient.setQueryData<ResponseMulti<LabelWithTasksType>>(
        ['subpage', subpageId, 'labelsWithTasks'],
        (oldData) => (oldData
          ? {
            ...oldData,
            data: oldData.data.filter((label) => label.id !== labelId),
          }
          : undefined),
      );
    },
  });

  return { deleteLabel };
};

export default UseDeleteLabel;
