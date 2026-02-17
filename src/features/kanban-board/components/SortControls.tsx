import useBoardStore from '../hooks/useBoardStore';
import KanbanIcon from '@/components/ui/KanbanIcon';
import { BsSortNumericDown, BsSortNumericDownAlt } from 'react-icons/bs';
import KanbanSelect from '@/components/ui/KanbanSelect';
import { TaskSortOptions } from '../types/TaskSortOptions.type';

const SortControls = () => {
  const sortTaskOptions = useBoardStore((state) => state.sortTaskOptions);
  const updateSortTaskOptions = useBoardStore(
    (state) => state.updateSortTaskOptions
  );

  const handleSortOptionSelection = (
    selectedSortOption: TaskSortOptions['field']
  ) => {
    updateSortTaskOptions({
      ...sortTaskOptions,
      field: selectedSortOption,
    });
  };
  const handleSortDirectionToggle = () => {
    updateSortTaskOptions({
      ...sortTaskOptions,
      direction: sortTaskOptions.direction === 'ASC' ? 'DESC' : 'ASC',
    });
  };

  return (
    <div className="flex">
      <button
        onClick={handleSortDirectionToggle}
        className="hover:border-custom-dark flex cursor-pointer items-center justify-center rounded border border-transparent p-1 hover:bg-white"
        title={`Switch to ${sortTaskOptions.direction === 'ASC' ? 'Descending' : 'Ascending'}`}
      >
        <KanbanIcon
          icon={
            sortTaskOptions.direction === 'ASC'
              ? BsSortNumericDown
              : BsSortNumericDownAlt
          }
          size={20}
        />
      </button>
      <KanbanSelect
        options={[
          { displayName: 'Erstellungsdatum', value: 'creationDate' },
          { displayName: 'Priorität', value: 'priority' },
        ]}
        onValueSelect={handleSortOptionSelection}
      />
    </div>
  );
};

export default SortControls;
