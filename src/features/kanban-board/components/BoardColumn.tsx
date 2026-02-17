import Column from '../interfaces/Column.interface';
import { TaskCard } from './TaskCard';

interface BoardColumnProps {
  column: Column;
}

export const BoardColumn = ({ column }: BoardColumnProps) => {
  const _renderTasks = () => {
    if (column.tasks.length === 0) {
      return <div className="text-sm text-gray-500 italic">No tasks</div>;
    }

    return (
      <>
        {column.tasks.map((task, index) => (
          <TaskCard key={`task-${column.id}-${index}`} task={task} />
        ))}
      </>
    );
  };

  return (
    <div className="flex w-72 flex-col overflow-hidden rounded-lg bg-gray-100 p-4">
      <h3 className="mb-4 font-bold">{column.name}</h3>
      <div className="flex flex-col gap-2">{_renderTasks()}</div>
    </div>
  );
};
