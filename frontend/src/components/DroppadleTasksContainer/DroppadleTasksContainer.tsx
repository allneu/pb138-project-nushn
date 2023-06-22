import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import SortableItem from '../SortableItem/SortableItem.tsx';
import { TaskType } from '../../models/taskTypes';
import Task from '../Task/Task.tsx';
import projectIcons from '../../../public/assets/icons/projectIcons.json';

type DroppadleTasksContainerProps = {
  containerId: string,
  tasks: TaskType[],
};

function DroppadleTasksContainer({
  containerId,
  tasks,
}: DroppadleTasksContainerProps) {
  const { setNodeRef } = useDroppable({
    id: containerId,
  });

  const tasksIds = tasks.map((task) => task.id);

  return (
    <SortableContext
      id={containerId}
      items={tasksIds}
      strategy={verticalListSortingStrategy}
    >
      <div ref={setNodeRef} className='flex flex-col gap-2 lg:gap-1'>
        {tasks.map((task) => (
          <SortableItem key={task.id} id={task.id}>
            <Task task={task} todoIcon={projectIcons['check-todo']} doneIcon={projectIcons['check-done']} />
          </SortableItem>
        ))}
      </div>
    </SortableContext>
  );
}

export default DroppadleTasksContainer;
