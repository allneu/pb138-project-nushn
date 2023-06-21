import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  useSensor,
  useSensors,
  MouseSensor,
} from '@dnd-kit/core';

import LabelTasks from './LabelTasks.tsx';
import './BoardView.css';
import projectIcons from '../../../public/assets/icons/projectIcons.json';
import useAddNewLabel from '../../hooks/useAddNewLabel.ts';
import { LabelCreateType, LabelWithTasksType } from '../../models/labelTypes';

type BoardViewProps = {
  labelsWithTasks: LabelWithTasksType[],
};

function BoardView({
  labelsWithTasks,
}: BoardViewProps) {
  const { addNewLabel } = useAddNewLabel();

  function handleAddNewLabel() {
    const newLabel: LabelCreateType = {
      name: 'Untitled',
    };
    addNewLabel(newLabel);
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log(active.data);
  };

  return (
    <div className="">
      <div className="columns-wrapper">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          autoScroll={false}
        >
          {
            labelsWithTasks.map((labelWithTasks) => (
              <LabelTasks key={labelWithTasks.id} labelWithTasks={labelWithTasks} />
            ))
          }
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
