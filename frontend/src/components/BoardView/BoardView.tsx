import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  DndContext,
  DragEndEvent,
  useSensor,
  useSensors,
  MouseSensor,
  UniqueIdentifier,
  DragStartEvent,
  DragOverlay,
  closestCenter,
} from '@dnd-kit/core';

import Task from '../Task/Task.tsx';
import LabelTasks from './LabelTasks.tsx';
import './BoardView.css';
import projectIcons from '../../../public/assets/icons/projectIcons.json';
import useAddNewLabel from '../../hooks/useAddNewLabel';
import { LabelCreateType, LabelWithTasksType } from '../../models/labelTypes';
import useUpdateTaskOrder from '../../hooks/update/useUpdateTaskOrder';

type BoardViewProps = {
  labelsWithTasks: LabelWithTasksType[],
};

function BoardView({
  labelsWithTasks,
}: BoardViewProps) {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>();
  const { addNewLabel } = useAddNewLabel();

  const handleAddNewLabel = () => {
    const newLabel: LabelCreateType = {
      name: 'Untitled',
    };
    addNewLabel(newLabel);
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    setActiveId(active.id);
  };

  const findLabel = (taskId: string) => labelsWithTasks.find(
    (labelWithTasks) => labelWithTasks.tasks.find((task) => task.id === taskId) !== undefined,
  );

  const findTask = (taskId: string) => labelsWithTasks.flatMap(
    (labelWithTasks) => labelWithTasks.tasks,
  ).find((task) => task.id === taskId);

  const { updateTaskOrder } = useUpdateTaskOrder();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over !== null && active.id !== over.id) {
      const oldLabelWithTasks = findLabel(active.id.toString());
      const newLabelWithTasks = findLabel(over.id.toString());
      const oldOrderInLabel = oldLabelWithTasks?.tasks.findIndex((task) => task.id === active.id);
      const newOrderInLabel = newLabelWithTasks?.tasks.findIndex((task) => task.id === over.id);

      const differentLabel = oldLabelWithTasks?.id !== newLabelWithTasks?.id;

      const data = {
        taskId: active.id.toString(),
        oldOrderInLabel,
        newOrderInLabel,
        oldLabelId: differentLabel ? oldLabelWithTasks?.id : undefined,
        newLabelId: differentLabel ? newLabelWithTasks?.id : undefined,
      };
      updateTaskOrder(data);
    }
    setActiveId(null);
  };
  return (
    <div className="">
      <div className="columns-wrapper">
        <DndContext
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          autoScroll={false}
        >
          {
            labelsWithTasks.map((labelWithTasks) => (
              <LabelTasks key={labelWithTasks.id} labelWithTasks={labelWithTasks} />
            ))
          }
          <DragOverlay>{activeId ? <Task
            task={findTask(activeId.toString())!}
            todoIcon={projectIcons['check-todo']}
            doneIcon={projectIcons['check-done']}
          /> : null}</DragOverlay>
        </DndContext>
        <div className='new-label' onClick={handleAddNewLabel}>
          <div className='flex gap-2'>
            <FontAwesomeIcon className='icon' icon={projectIcons['add-new'].split(' ') as IconProp} />
            <span className="new-label__text">Add new label</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoardView;
