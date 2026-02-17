import { DragEndEvent } from '@dnd-kit/core';
import useBoardStore from './useBoardStore';
import { TaskDragData } from '../types/TaskDragData.type';
import {
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

const useTaskCardDrag = () => {
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

  const { moveTaskToColumn } = useBoardStore();
  const onCardDragEnd = (event: DragEndEvent) => {
    const { active: draggedCardElement, over: newParentColumn } = event;

    // draggedCardElement.data will always be of type TaskDragData here but eslint can't know that (so we force cast over unknown)
    const dragData = draggedCardElement.data.current as unknown as TaskDragData;

    if (
      !newParentColumn ||
      !newParentColumn.id ||
      !dragData ||
      !dragData.task
    ) {
      return;
    }

    moveTaskToColumn(dragData.task, parseInt(newParentColumn.id as string, 10));
  };

  return { sensors, onCardDragEnd };
};

export default useTaskCardDrag;
