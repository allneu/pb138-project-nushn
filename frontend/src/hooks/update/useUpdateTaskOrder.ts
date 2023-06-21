import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TasksApi } from '../../services';
import { TaskUpdateOrderType } from '../../models';

const useUpdateTaskOrder = () => {
  const { subpageId } = useParams();
  const queryClient = useQueryClient();

  const transformData = (data: TaskUpdateOrderType) => {
    const { taskId, ...rest } = data;
    return rest;
  };

  const updateTaskFn = (
    data: TaskUpdateOrderType,
  ) => TasksApi.updateSingle(subpageId!, data.taskId, transformData(data));

  const { mutateAsync: updateTaskOrder } = useMutation({
    mutationFn: updateTaskFn,
    onSuccess: () => {
      queryClient.invalidateQueries(['subpage', subpageId, 'labelsWithTasks']);
    },
  });

  return { updateTaskOrder };
};

export default useUpdateTaskOrder;
