import { BoardColumn } from './components/BoardColumn';
import useTaskCardDrag from './hooks/useTaskCardDrag';
import useBoardStore from './hooks/useBoardStore';
import { DndContext } from '@dnd-kit/core';
import { PiSortAscending } from 'react-icons/pi';
import { FaPlus } from 'react-icons/fa6';

const KanbanBoard = () => {
  const { columns } = useBoardStore();

  const { onCardDragEnd } = useTaskCardDrag();

  return (
    <div className="mt-8 flex max-w-full flex-col gap-4">
      <div className="flex justify-between px-2">
        <PiSortAscending />
        <FaPlus />
      </div>
      <DndContext onDragEnd={onCardDragEnd}>
        <div className="flex h-full max-h-screen min-h-[50vh] justify-center gap-4">
          {columns.map((column, index) => (
            <BoardColumn key={index} column={column} />
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
