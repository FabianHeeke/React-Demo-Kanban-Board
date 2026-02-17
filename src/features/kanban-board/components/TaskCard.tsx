import Task from '../interfaces/Task.interface';
import classnames from 'classnames';
import { useDraggable } from '@dnd-kit/core';
import { useDateFormatter } from '../hooks/useDateFormatter';
interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export const TaskCard = ({ task, onEdit }: TaskCardProps) => {
  const { formatDate } = useDateFormatter();
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
      className="relative touch-none"
      onClick={() => onEdit(task)}
    >
      <div
        className={classnames(
          'border-custom-dark cursor-pointer rounded border bg-white p-2 hover:shadow-[3px_3px_0px_1px_rgba(0,0,0,0.1)]'
        )}
      >
        <div className="flex justify-between">
          <p className="text-2xs">{formatDate(new Date(task.creationDate))}</p>
          <p className="text-xs font-bold">
            {[...Array(4 - task.priority)].map(() => (
              <span>!</span>
            ))}
          </p>
        </div>
        <h3 className="my-1">{task.title}</h3>
        <p className="line-clamp-3 min-h-[3lh] text-xs">{task.description}</p>
      </div>
    </div>
  );
};
