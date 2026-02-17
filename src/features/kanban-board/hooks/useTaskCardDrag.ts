import { DragEndEvent } from '@dnd-kit/core';
import useBoardStore from './useBoardStore';
import {
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

const useTaskCardDrag = () => {
  const { moveTaskToColumn } = useBoardStore();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const onCardDragEnd = (event: DragEndEvent) => {
    const { active: draggedCardElement, over: newParentColumn } = event;

    if (!draggedCardElement || !newParentColumn) {
      return;
    }

    moveTaskToColumn(
      parseInt(draggedCardElement.id as string, 10),
      parseInt(newParentColumn.id as string, 10)
    );
  };

  return { sensors, onCardDragEnd };
};

export default useTaskCardDrag;
