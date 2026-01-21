import Column from '../interfaces/Column.interface';
import { TaskCard } from './TaskCard';
import classnames from 'classnames';
import { useDroppable } from '@dnd-kit/core';
import Task from '../interfaces/Task.interface';
import useColumnTasks from '../hooks/useColumnTasks';

interface BoardColumnProps {
  column: Column;
  onEditTask: (task: Task) => void;
}

export const BoardColumn = ({ column, onEditTask }: BoardColumnProps) => {
  const tasks = useColumnTasks(column.id);

  const { isOver, setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div ref={setNodeRef} className={classnames('flex w-72 flex-col p-4')}>
      <div className="mb-6 flex items-center gap-2">
        <h2
          className={classnames('text-custom-dark capitalize', {
            'font-bold underline': isOver,
          })}
        >
          {column.name}
        </h2>
        <p className="text-custom-dark text-md opacity-50">{tasks.length}</p>
      </div>
      <div className="flex flex-col gap-2">
        {tasks.length === 0 ? (
          <div className="text-custom-dark text-sm">-</div>
        ) : (
          <>
            {tasks.map((task) => (
              // Task Card is draggable
              <TaskCard
                key={`task-${task.id}`}
                task={task}
                onEdit={onEditTask}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
