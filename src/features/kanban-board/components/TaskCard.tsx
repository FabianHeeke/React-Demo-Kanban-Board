import Task from '../interfaces/Task.interface';
import classnames from 'classnames';
import { useDraggable } from '@dnd-kit/core';
import { FaTrash } from 'react-icons/fa';
import KanbanIcon from '@/components/ui/KanbanIcon';

interface TaskCardProps {
  task: Task;
  columnId: number;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

export const TaskCard = ({
  task,
  columnId,
  onEdit,
  onDelete,
}: TaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: { task: task, parentColumnId: columnId },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent drag/edit
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="group relative"
      onClick={(event: React.MouseEvent) => {
        event.stopPropagation();
        onEdit(task);
      }}
    >
      <div
        className={classnames(
          'cursor-pointer touch-none rounded p-2 transition-all ease-in-out hover:scale-105 hover:shadow-md',
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
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 hidden rounded bg-white/50 p-1 group-hover:block hover:bg-white/80"
          title="Delete task"
        >
          <KanbanIcon icon={FaTrash} size={12} />
        </button>
      </div>
    </div>
  );
};
