import { BoardColumn } from './components/BoardColumn';
import useBoardStore from './hooks/useBoardStore';

const KanbanBoard = () => {
  const { columns } = useBoardStore();
  return (
    <div className="p-8">
      <div className="flex h-full max-h-screen min-h-[50vh] gap-4 overflow-x-auto bg-gray-50">
        {columns.map((column, index) => (
          <BoardColumn key={index} column={column} />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
