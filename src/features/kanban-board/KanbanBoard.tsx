import { BoardColumn } from './components/BoardColumn';
import useBoardStore from './store/useBoardStore';

const KanbanBoard = () => {
  const { columns } = useBoardStore();
  return (
    <div className="flex h-full min-h-screen gap-4 overflow-x-auto bg-gray-50 p-8">
      {columns.map((column, index) => (
        <BoardColumn key={index} column={column} />
      ))}
    </div>
  );
};

export default KanbanBoard;
