import { DragEndEvent } from '@dnd-kit/core';
import useBoardStore from './useBoardStore';
import { TaskDragData } from '../types/TaskDragData.type';

const useTaskCardDrag = () => {
  const { moveTaskToColumn } = useBoardStore();
  const onCardDragEnd = (event: DragEndEvent) => {
    const { active: draggedCardElement, over: newParentColumn } = event;

    // draggedCardElement.data will always be of type TaskDragData here but eslint can't know that (so we force cast over unknown)
    const dragData = draggedCardElement.data.current as unknown as TaskDragData;

    if (
      !newParentColumn ||
      !newParentColumn.id ||
      !dragData ||
      !dragData.task ||
      !dragData.parentColumnId
    ) {
      return;
    }

    moveTaskToColumn({
      draggedTask: dragData.task,
      sourceColumnId: dragData.parentColumnId,
      targetColumnId: parseInt(newParentColumn.id as string, 10),
    });
  };

  return { onCardDragEnd };
};

export default useTaskCardDrag;
