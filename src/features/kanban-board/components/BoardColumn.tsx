import Column from '../interfaces/Column.interface';
import { TaskCard } from './TaskCard';
import classnames from 'classnames';
import { useDroppable } from '@dnd-kit/core';
import Task from '../interfaces/Task.interface';
import useSortedColumnTasks from '../hooks/useSortedColumnTasks';
import { FiPlus } from 'react-icons/fi';
import KanbanIcon from '@/components/ui/KanbanIcon';

interface BoardColumnProps {
  column: Column;
  onCreateTask: (createTaskParams: Partial<Task>) => void;
  onEditTask: (task: Task) => void;
}

export const BoardColumn = ({
  column,
  onCreateTask,
  onEditTask,
}: BoardColumnProps) => {
  const tasks = useSortedColumnTasks(column.id);

  const { isOver, setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div ref={setNodeRef} className="group flex flex-col p-4">
      <div className="flex items-start justify-between">
        <div className="mb-6 flex items-center gap-2">
          <h2
            className={classnames('text-custom-dark uppercase', {
              'font-bold underline': isOver,
            })}
          >
            {column.name}
          </h2>
          <p className="text-custom-dark text-md opacity-50">{tasks.length}</p>
        </div>
        <button
          onClick={() => onCreateTask({ columnId: column.id })}
          className="cursor-pointer rounded opacity-0 transition-opacity ease-in group-hover:opacity-50 hover:opacity-100"
        >
          <KanbanIcon icon={FiPlus} className="stroke-custom-dark" />
        </button>
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
