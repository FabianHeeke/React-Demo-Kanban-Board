import { ChangeEvent } from 'react';
import useBoardStore from '../hooks/useBoardStore';
import { PiSortAscending, PiSortDescending } from 'react-icons/pi';
import KanbanIcon from '@/components/ui/KanbanIcon';

const SortControls = () => {
  const { sortTaskOptions, updateSortTaskOptions } = useBoardStore();

  const handleSortFieldChange = (event: ChangeEvent<HTMLSelectElement>) => {
    updateSortTaskOptions({
      ...sortTaskOptions,
      field: event.target.value as 'creationDate' | 'priority',
    });
  };

  const handleSortDirectionToggle = () => {
    updateSortTaskOptions({
      ...sortTaskOptions,
      direction: sortTaskOptions.direction === 'ASC' ? 'DESC' : 'ASC',
    });
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={sortTaskOptions.field}
        onChange={handleSortFieldChange}
        className="cursor-pointer rounded border border-black bg-transparent p-2 text-sm outline-none"
      >
        <option value="creationDate">Creation Date</option>
        <option value="priority">Priority</option>
      </select>
      <button
        onClick={handleSortDirectionToggle}
        className="flex cursor-pointer items-center justify-center rounded p-1 hover:bg-gray-100"
        title={`Switch to ${sortTaskOptions.direction === 'ASC' ? 'Descending' : 'Ascending'}`}
      >
        <KanbanIcon
          icon={
            sortTaskOptions.direction === 'ASC'
              ? PiSortAscending
              : PiSortDescending
          }
          size={20}
        />
      </button>
    </div>
  );
};

export default SortControls;
