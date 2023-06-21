import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ResponseSingle,
  ResponseMulti,
  LabelWithTasksType,
  TaskUpdateType,
  TaskUpdateResultType,
} from '../models';
import { TasksApi } from '../services';

type UseUpdateTaskProps = {
  taskId: string,
};

const useUpdateTask = ({
  taskId,
}: UseUpdateTaskProps) => {
  const { subpageId } = useParams();
  const queryClient = useQueryClient();

  const labelsWithTasks = queryClient.getQueryData<ResponseMulti<LabelWithTasksType>>(['subpage', subpageId, 'labelsWithTasks']);

  const transformUpdateData = (newData: TaskUpdateType) => {
    const task = labelsWithTasks?.data.flatMap(
      (labelWithTasks) => labelWithTasks.tasks,
    ).find((t) => t.id === taskId);
    const a = {
      oldTaskName: newData.taskName ? task?.taskName : undefined,
      oldDueDate: newData.dueDate ? task?.dueDate : undefined,
      oldContent: newData.content ? task?.content : undefined,
      oldLabelId: newData.labelId ? task?.labelId : undefined,
      oldOrderInList: newData.orderInList ? task?.orderInList : undefined,
      oldOrderInLabel: newData.orderInLabel ? task?.orderInLabel : undefined,
      newTaskName: newData.taskName,
      newDueDate: newData.dueDate,
      newContent: newData.content,
      newLabelId: newData.labelId,
      newOrderInList: newData.orderInList,
      newOrderInLabel: newData.orderInLabel,
    };
    console.log(a);
    return a;
  };

  const updateTaskFn = (
    data: TaskUpdateType,
  ) => TasksApi.updateSingle(subpageId!, taskId, transformUpdateData(data));

  const setLabelsWithTasksFn = (
    oldLabelsResponse: ResponseMulti<LabelWithTasksType>,
    updateTaskResponse: ResponseSingle<TaskUpdateResultType>,
  ) => oldLabelsResponse.data.map(
    (mappedLabel) => ({
      ...mappedLabel,
      tasks: mappedLabel.tasks.map(
        (mappedTask) => ((mappedTask.id === taskId)
          ? {
            ...mappedTask,
            ...updateTaskResponse,
          } : { ...mappedTask }),
      ),
    }),
  );

  const { mutateAsync: updateTask } = useMutation({
    mutationFn: updateTaskFn,
    onSuccess: (updateTaskResponse: ResponseSingle<TaskUpdateResultType>) => {
      queryClient.setQueryData<ResponseMulti<LabelWithTasksType>>(
        ['subpage', subpageId, 'labelsWithTasks'],
        (oldLabelsResponse) => (oldLabelsResponse ? {
          ...oldLabelsResponse,
          data: setLabelsWithTasksFn(oldLabelsResponse, updateTaskResponse),
        } : undefined),
      );
    },
  });

  return { updateTask };
};

export default useUpdateTask;
