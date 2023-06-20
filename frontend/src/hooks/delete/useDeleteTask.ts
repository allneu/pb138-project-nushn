import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { TasksApi } from '../../services';
import { LabelWithTasksType, ResponseMulti, TaskType } from '../../models';

type UseDeleteTaskProps = {
  redirect: string;
  task: TaskType;
};

const UseDeleteTask = ({ redirect, task }: UseDeleteTaskProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { subpageId } = useParams();

  const deleteTaskFC = () => TasksApi.deleteSingle(subpageId || '', task.id);

  const { mutateAsync: deleteTask } = useMutation({
    mutationFn: deleteTaskFC,
    onSuccess: () => {
      queryClient.setQueryData<ResponseMulti<LabelWithTasksType>>(
        ['subpage', subpageId, 'labelsWithTasks'],
        (oldData) => (oldData
          ? {
            ...oldData,
            data: oldData.data.map((label) => {
              if (label.id === task.labelId) {
                return {
                  ...label,
                  tasks: label.tasks.filter((t) => t.id !== task.id),
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

export default UseDeleteTask;
