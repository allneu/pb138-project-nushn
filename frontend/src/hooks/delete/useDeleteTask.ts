import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { TasksApi } from '../../services';
import {
  LabelWithTasksType, ResponseMulti, ResponseSingle, TaskDeleteResultType,
} from '../../models';

type UseDeleteTaskProps = {
  redirect: string;
};

const useDeleteTask = ({ redirect }: UseDeleteTaskProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { subpageId } = useParams();

  const { mutateAsync: deleteTask } = useMutation({
    mutationFn: (taskId: string) => TasksApi.deleteSingle(subpageId || '', taskId),
    onSuccess: (deletedTask: ResponseSingle<TaskDeleteResultType>) => {
      queryClient.invalidateQueries(['subpage', subpageId]);
      queryClient.setQueryData<ResponseMulti<LabelWithTasksType>>(
        ['subpage', subpageId, 'labelsWithTasks'],
        (oldData) => (oldData
          ? {
            ...oldData,
            data: oldData.data.map((label) => {
              if (label.id === deletedTask.data.labelId) {
                return {
                  ...label,
                  tasks: label.tasks.filter((t) => t.id !== deletedTask.data.taskId),
                };
              }
              return label;
            }),
          }
          : undefined),
      );
      navigate(redirect);
    },
  });

  return { deleteTask };
};

export default useDeleteTask;
