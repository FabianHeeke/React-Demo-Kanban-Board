import Column from '../interfaces/Column.interface';
import { TaskCard } from './TaskCard';
import classnames from 'classnames';
import { useDroppable } from '@dnd-kit/core';

interface BoardColumnProps {
  column: Column;
}

export const BoardColumn = ({ column }: BoardColumnProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: column.id,
  });

  const _renderTasks = () => {
    if (column.tasks.length === 0) {
      return <div className="text-sm text-gray-500 italic">No tasks</div>;
    }

    return (
      <>
        {column.tasks.map((task, index) => (
          // Task Card is draggable
          <TaskCard
            key={`task-${column.id}-${index}`}
            task={task}
            columnId={column.id}
          />
        ))}
      </>
    );
  };

  return (
    <div
      ref={setNodeRef}
      className={classnames(
        'flex w-72 flex-col rounded-lg border border-black p-4',
        { 'bg-gray-50': isOver }
      )}
    >
      <h3 className="mb-4 font-bold">{column.name}</h3>
      <div className="flex flex-col gap-2">{_renderTasks()}</div>
    </div>
  );
};
