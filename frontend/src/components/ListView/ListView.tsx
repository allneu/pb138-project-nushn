import {
  DndContext,
  DragEndEvent,
  closestCenter,
  useSensor,
  useSensors,
  MouseSensor,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import NewTask from '../Task/NewTask.tsx';
import Task from '../Task/Task.tsx';
import { TaskType } from '../../models/taskTypes';
import ListViewType from './listViewType';
import projectIcons from '../../../public/assets/icons/projectIcons.json';
import SortableItem from '../SortableItem/SortableItem.tsx';
import useUpdateTaskOrder from '../../hooks/update/useUpdateTaskOrder.ts';

type ListViewProps = {
  type: ListViewType,
  tasks: TaskType[],
};

function ListView({
  type,
  tasks,
}: ListViewProps) {
  const todoIcon = projectIcons[`${type}-todo`];
  const doneIcon = projectIcons[`${type}-done`];

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  const { updateTaskOrder } = useUpdateTaskOrder();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over !== null && active.id !== over.id) {
      const oldOrderInList = tasks.findIndex((task) => task.id === active.id);
      const newOrderInList = tasks.findIndex((task) => task.id === over.id);

      const data = {
        taskId: active.id.toString(),
        oldOrderInList,
        newOrderInList,
      };
      console.log(data);
      updateTaskOrder(data);
    }
  };

  return (
    <div className="flex flex-col gap-1 lg:pt-5 overflow-y-auto">
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        sensors={sensors}
        autoScroll={false}
      >
          <SortableContext
            items={tasks.map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            {tasks.map((task) => (
              <SortableItem key={task.id} id={task.id}>
                  <Task task={task} todoIcon={todoIcon} doneIcon={doneIcon} />
              </SortableItem>
            ))}
          </SortableContext>
      </DndContext>
      <NewTask />
    </div>
  );
}

export default ListView;
