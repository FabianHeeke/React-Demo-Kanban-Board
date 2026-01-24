import { KanbanSelectOption } from '@/features/kanban-board/types/KanbanSelectOption.type';
import { useState } from 'react';
import classnames from 'classnames';
import KanbanIcon from './KanbanIcon';
import { FaCheck } from 'react-icons/fa6';

interface KanbanSelectProps {
  options: KanbanSelectOption[];
  onValueSelect: (selectedValue: KanbanSelectOption['value']) => void;
}

const KanbanSelect = ({ options, onValueSelect }: KanbanSelectProps) => {
  const [selectedOption, setSelectedOption] = useState<KanbanSelectOption>(
    options[0]
  );
  const [isSelectDropdownVisible, setIsSelectDropdownVisible] = useState(false);

  const handleValueSelect = (selectedOption: KanbanSelectOption) => {
    setIsSelectDropdownVisible(false);
    setSelectedOption(selectedOption);
    onValueSelect(selectedOption.value);
  };

  return (
    <div className="relative">
      <div
        onClick={() => setIsSelectDropdownVisible(!isSelectDropdownVisible)}
        className={classnames(
          'hover:border-custom-dark absolute top-0 z-20 max-w-fit cursor-pointer rounded border px-2 py-1 transition-colors hover:bg-white',
          {
            'border-custom-dark bg-white': isSelectDropdownVisible,
            'border-transparent': !isSelectDropdownVisible,
          }
        )}
      >
        <div className="flex items-center gap-1">
          <p className="hover:underline">{selectedOption.displayName}</p>
        </div>
        <div
          className={classnames(
            'grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows] duration-200 ease-in-out',
            {
              'grid-rows-[1fr] opacity-100': isSelectDropdownVisible,
            }
          )}
        >
          <div
            className={classnames(
              'border-custom-dark flex w-max min-w-full flex-col gap-1 overflow-hidden border-t',
              {
                'mt-2 pt-2': isSelectDropdownVisible,
              }
            )}
          >
            {options.map((option, index) => (
              <div
                key={`sort-selct-option-${index}-${option.value} `}
                className="group flex items-center gap-2"
                onClick={() => handleValueSelect(option)}
              >
                <p
                  className={classnames('group-hover:underline', {
                    hidden: !isSelectDropdownVisible,
                  })}
                >
                  {option.displayName}
                </p>
                {option.displayName === selectedOption.displayName ? (
                  <KanbanIcon icon={FaCheck} size={15} />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanSelect;
