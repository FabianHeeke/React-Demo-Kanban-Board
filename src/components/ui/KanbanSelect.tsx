import { KanbanSelectOption } from '@/features/kanban-board/types/KanbanSelectOption.type';
import { useState, useCallback } from 'react';
import classnames from 'classnames';
import KanbanIcon from './KanbanIcon';

interface KanbanSelectProps {
  options: KanbanSelectOption[];
  onValueSelect: (selectedValue: KanbanSelectOption['value']) => void;
  prefixIcon?: React.FC;
}

const KanbanSelect = ({
  options,
  onValueSelect,
  prefixIcon,
}: KanbanSelectProps) => {
  const [selectedOption, setSelectedOption] = useState<KanbanSelectOption>(
    options[0]
  );
  const [isSelectDropdownVisible, setIsSelectDropdownVisible] = useState(false);

  const handleValueSelect = useCallback(
    (selectedOption: KanbanSelectOption) => {
      setIsSelectDropdownVisible(false);
      setSelectedOption(selectedOption);
      onValueSelect(selectedOption.value);
    },
    []
  );

  return (
    <div
      className={classnames(
        'hover:border-custom-dark absolute top-0 z-20 max-w-fit cursor-pointer rounded border px-2 py-1 transition-colors hover:bg-white',
        {
          'border-custom-dark bg-white': isSelectDropdownVisible,
          'border-transparent': !isSelectDropdownVisible,
        }
      )}
    >
      <div className="relative flex items-center gap-1">
        {prefixIcon && <KanbanIcon icon={prefixIcon} size={15} />}
        <p
          className="hover:underline"
          onClick={() => setIsSelectDropdownVisible(!isSelectDropdownVisible)}
        >
          {selectedOption.displayName}
        </p>
      </div>
      <div
        className={classnames(
          'grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows] duration-200 ease-in-out',
          {
            'grid-rows-[1fr] opacity-100': isSelectDropdownVisible,
          }
        )}
      >
        <div className="mt-1 flex w-max flex-col gap-1 overflow-hidden">
          {options
            .filter((option) => option !== selectedOption)
            .map((option, index) => (
              <div className="flex gap-1">
                {prefixIcon && (
                  <KanbanIcon
                    icon={prefixIcon}
                    size={15}
                    className="invisible"
                  />
                )}
                <p
                  key={`sort-selct-option-${index}-${option.value} `}
                  onClick={() => handleValueSelect(option)}
                  className={classnames('hover:underline', {
                    hidden: !isSelectDropdownVisible,
                  })}
                >
                  {option.displayName}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanSelect;
