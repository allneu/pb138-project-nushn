import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TasksApi } from '../../services';
import { TaskUpdateSendType } from '../../models';

const useUpdateTaskOrder = () => {
  const { subpageId } = useParams();
  const queryClient = useQueryClient();

  const updateTaskFn = (
    data: TaskUpdateOrderType,
  ) => TasksApi.updateSingle(subpageId!, data.taskId, data);

  const { mutateAsync: updateTaskOrder } = useMutation({
    mutationFn: updateTaskFn,
    onSuccess: () => {
      queryClient.invalidateQueries(['subpage', subpageId, 'labelsWithTasks']);
    },
  });

  return { updateTaskOrder };
};

export default useUpdateTaskOrder;
