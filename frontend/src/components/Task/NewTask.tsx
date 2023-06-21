import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import projectIcons from '../../../public/assets/icons/projectIcons.json';
import { addSingle } from '../../services/tasksApi';

import './Task.css';
import {
  LabelWithTasksType, ResponseMulti, ResponseSingle, TaskCreateResultType, TaskCreateType,
} from '../../models';
import useAuth from '../../hooks/useAuth';

type NewTaskProps = {
  labelId?: string,
};

function NewTask({ labelId }: NewTaskProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { subpageId } = useParams();
  const { auth } = useAuth();
  const userId = auth?.data.id;

  const newTaskFC = (data: TaskCreateType) => addSingle(subpageId || '', data);

  const { mutateAsync: mutate } = useMutation({
    mutationFn: newTaskFC,
    onSuccess: (newTaskResponse: ResponseSingle<TaskCreateResultType>) => {
      queryClient.setQueryData<ResponseMulti<LabelWithTasksType>>(
        ['subpage', subpageId, 'labelsWithTasks'],
        (oldData) => (oldData ? {
          ...oldData,
          data: oldData.data.map((label) => {
            if (label.id === newTaskResponse.data.labelId) {
              return {
                ...label,
                tasks: [...label.tasks, newTaskResponse.data],
              };
            }
            return label;
          }),
        }
          : undefined),
      );
      navigate(`task/${newTaskResponse.data.id}`);
    },
  });

  function handleAddNewTask() {
    const newTask: TaskCreateType = {
      taskName: 'Untitled',
      dueDate: (new Date()).toISOString(),
      content: '',
      creatorId: userId || '',
      ...(labelId && { labelId }),
    };
    mutate(newTask);
  }

  return (
    <div className="task" onClick={handleAddNewTask}>
        <FontAwesomeIcon className='icon' icon={projectIcons['add-new'].split(' ') as IconProp} />
        <span className="task__name task__name--new">Add new task</span>
    </div>
  );
}

export default NewTask;
