import Task from '../interfaces/Task.interface';
import classnames from 'classnames';

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  return (
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
  );
};
