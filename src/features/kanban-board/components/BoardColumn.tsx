import Column from '../interfaces/Column.interface';

interface ColumnProps {
  column: Column;
}

export const BoardColumn = ({ column }: ColumnProps) => {
  const _renderTasks = () => {
    if (column.tasks.length === 0) {
      return <div className="text-sm text-gray-500 italic">No tasks</div>;
    }

    return (
      <>
        {column.tasks.map((task, index) => (
          <p key={index}>{task}</p>
        ))}
      </>
    );
  };

  return (
    <div className="flex w-72 flex-col rounded-lg bg-gray-100 p-4">
      <h3 className="mb-4 font-bold">{column.name}</h3>
      <div className="flex flex-col gap-2">{_renderTasks()}</div>
    </div>
  );
};
