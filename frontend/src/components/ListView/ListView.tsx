import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';

import Task from '../Task/Task.tsx';
import { TaskType } from '../../models/taskTypes';
import ListViewType from './listViewType';
import projectIcons from '../../../public/assets/icons/projectIcons.json';
import SortableItem from '../SortableItem/SortableItem.tsx';

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over !== null && active.id !== over.id) {
      const activeIndex = tasks.findIndex((task) => task.id === active.id);
      const overIndex = tasks.findIndex((task) => task.id === over.id);

      console.log(arrayMove(tasks, activeIndex, overIndex).map((movedTask) => movedTask.taskName));
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col gap-1 lg:pt-5 overflow-y-auto">
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <SortableItem
              key={task.id}
              id={task.id}
              children={
                <Task task={task} todoIcon={todoIcon} doneIcon={doneIcon}/>
              }
            />
          ))}
        </SortableContext>
      </div>
    </DndContext>

  //   <NewTask />
  );
}

export default ListView;
