import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ResponseSingle,
  ResponseMulti,
  LabelUpdateType,
  LabelWithTasksType,
  LabelUpdateResultType,
} from '../models';
import { LabelsApi } from '../services';

type UseUpdateLabelProps = {
  labelId: string,
};

const useUpdateLabel = ({
  labelId,
}: UseUpdateLabelProps) => {
  const { subpageId } = useParams();
  const queryClient = useQueryClient();

  const labelsWithTasks = queryClient.getQueryData<ResponseMulti<LabelWithTasksType>>(['subpage', subpageId, 'labelsWithTasks']);

  const transformUpdateData = (newData: LabelUpdateType) => {
    const labelWithTasks = labelsWithTasks?.data.find((label) => label.id === labelId);
    return {
      oldName: newData.name ? labelWithTasks?.name : undefined,
      oldOrderInSubpage: newData.orderInSubpage ? labelWithTasks?.orderInSubpage : undefined,
      newName: newData.name,
      newOrderInSubpage: newData.orderInSubpage,
    };
  };

  const updateLabelFn = (
    data: LabelUpdateType,
  ) => LabelsApi.updateSingle(subpageId!, labelId, transformUpdateData(data));

  const setLabelsWithTasksFn = (
    oldLabelsResponse: ResponseMulti<LabelWithTasksType>,
    updatedLabelResponse: ResponseSingle<LabelUpdateResultType>,
  ) => oldLabelsResponse.data.map(
    (mappedLabel) => (mappedLabel.id === updatedLabelResponse.data.id ? {
      ...mappedLabel,
      ...updatedLabelResponse.data,
    } : { ...mappedLabel }),
  );

  const { mutateAsync: updateLabel } = useMutation({
    mutationFn: updateLabelFn,
    onSuccess: (updatedLabelResponse: ResponseSingle<LabelUpdateResultType>) => {
      queryClient.setQueryData<ResponseMulti<LabelWithTasksType>>(
        ['subpage', subpageId, 'labelsWithTasks'],
        (oldLabelsResponse) => (oldLabelsResponse ? {
          ...oldLabelsResponse,
          data: setLabelsWithTasksFn(oldLabelsResponse, updatedLabelResponse),
        } : undefined),
      );
    },
  });

  return { updateLabel };
};

export default useUpdateLabel;
