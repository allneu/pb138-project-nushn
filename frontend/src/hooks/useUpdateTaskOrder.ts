import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TasksApi } from '../services';
import { TaskUpdateSendType } from '../models';

type UseUpdateTaskOrderProps = {
  taskId: string,
};

const useUpdateTaskOrder = ({
  taskId,
}: UseUpdateTaskOrderProps) => {
  const { subpageId } = useParams();
  const queryClient = useQueryClient();

  const updateTaskFn = (
    data: TaskUpdateSendType,
  ) => TasksApi.updateSingle(subpageId!, taskId, data);

  const { mutateAsync: updateTaskOrder } = useMutation({
    mutationFn: updateTaskFn,
    onSuccess: () => {
      queryClient.invalidateQueries(['subpage', subpageId, 'labelsWithTasks']);
    },
  });

  return { updateTaskOrder };
};

export default useUpdateTaskOrder;
