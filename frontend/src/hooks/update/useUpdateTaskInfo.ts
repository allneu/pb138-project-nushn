import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ResponseSingle,
  ResponseMulti,
  LabelWithTasksType,
  TaskUpdateInfoType,
  TaskUpdateResultType,
} from '../../models';
import { TasksApi } from '../../services';

type UseUpdateTaskInfoProps = {
  taskId: string,
};

const useUpdateTaskInfo = ({
  taskId,
}: UseUpdateTaskInfoProps) => {
  const { subpageId } = useParams();
  const queryClient = useQueryClient();

  const labelsWithTasks = queryClient.getQueryData<ResponseMulti<LabelWithTasksType>>(['subpage', subpageId, 'labelsWithTasks']);

  const transformUpdateData = (newData: TaskUpdateInfoType) => {
    const task = labelsWithTasks?.data.flatMap(
      (labelWithTasks) => labelWithTasks.tasks,
    ).find((t) => t.id === taskId);
    return {
      oldTaskName: newData.taskName ? task?.taskName : undefined,
      // server needs it in this format
      oldDueDate: newData.dueDate ? (new Date(task!.dueDate)).toISOString() : undefined,
      oldContent: task?.content,
      oldLabelId: newData.labelId ? task?.labelId : undefined,
      newTaskName: newData.taskName,
      newDueDate: newData.dueDate,
      newContent: newData.content,
      newLabelId: newData.labelId,
    };
  };

  const updateTaskFn = (
    data: TaskUpdateInfoType,
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
            ...updateTaskResponse.data,
          } : { ...mappedTask }),
      ),
    }),
  );

  const { mutateAsync: updateTaskInfo } = useMutation({
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

  return { updateTaskInfo };
};

export default useUpdateTaskInfo;
