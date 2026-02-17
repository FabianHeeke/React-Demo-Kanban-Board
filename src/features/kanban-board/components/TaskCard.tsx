import Task from '../interfaces/Task.interface';
import classnames from 'classnames';
import { useDraggable } from '@dnd-kit/core';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export const TaskCard = ({ task, onEdit }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });
  const cardDragTransformation = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={cardDragTransformation}
      {...listeners}
      {...attributes}
      className="group relative touch-none"
      onClick={() => onEdit(task)}
    >
      <div
        className={classnames(
          'cursor-pointer rounded p-2 transition-all ease-in-out hover:scale-105 hover:shadow-md',
          {
            'bg-red-400': task.priority === 1,
            'bg-orange-300': task.priority === 2,
            'bg-blue-300': task.priority === 3,
          }
        )}
      >
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold">{task.title}</h3>
          <p className="truncate text-xs text-ellipsis">{task.description}</p>
        </div>
      </div>
    </div>
  );
};
