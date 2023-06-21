import { ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type SortableItemProps = {
  id: string,
  children: ReactNode,
};

function SortableItem({
  id,
  children,
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} className={isDragging ? 'pointer-events-none' : ''} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

export default SortableItem;
