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
  const { sortedTasksForColumn: tasks } = useColumnTasks(column.id);

  const { isOver, setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={classnames(
        'flex w-72 flex-col rounded-lg border border-black p-4',
        { 'bg-gray-50': isOver }
      )}
    >
      <h3 className="mb-4 font-bold">{column.name}</h3>
      <div className="flex flex-col gap-2">
        {tasks.length === 0 ? (
          <div className="text-sm text-gray-500 italic">No tasks</div>
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
