import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ResponseSingle,
  ResponseMulti,
  LabelCreateType,
  LabelCreateResultType,
  LabelWithTasksType,
} from '../../models';
import { LabelsApi } from '../../services';

const useAddNewLabel = () => {
  const { subpageId } = useParams();
  const queryClient = useQueryClient();

  const newLabelFC = (data: LabelCreateType) => LabelsApi.addSingle(subpageId!, data);

  const { mutateAsync: addNewLabel } = useMutation({
    mutationFn: newLabelFC,
    onSuccess: (newTaskResponse: ResponseSingle<LabelCreateResultType>) => {
      queryClient.setQueryData<ResponseMulti<LabelWithTasksType>>(
        ['subpage', subpageId, 'labelsWithTasks'],
        (oldData) => (oldData ? {
          ...oldData,
          data: [...oldData.data, { ...newTaskResponse.data, tasks: [] }],
        }
          : undefined),
      );
    },
  });

  return { addNewLabel };
};

export default useAddNewLabel;
