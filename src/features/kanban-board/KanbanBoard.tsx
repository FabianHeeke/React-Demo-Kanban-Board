import { BoardColumn } from './components/BoardColumn';
import useTaskCardDrag from './hooks/useTaskCardDrag';
import useBoardStore from './hooks/useBoardStore';
import { DndContext } from '@dnd-kit/core';

const KanbanBoard = () => {
  const { columns } = useBoardStore();

  const { onCardDragEnd } = useTaskCardDrag();

  return (
    <DndContext onDragEnd={onCardDragEnd}>
      <div className="p-8">
        <div className="flex h-full max-h-screen min-h-[50vh] justify-center gap-4">
          {columns.map((column, index) => (
            <BoardColumn key={index} column={column} />
          ))}
        </div>
      </div>
    </DndContext>
  );
};

export default KanbanBoard;
