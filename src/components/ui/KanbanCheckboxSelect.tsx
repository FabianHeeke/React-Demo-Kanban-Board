import { KanbanSelectOption } from '@/features/kanban-board/types/KanbanSelectOption.type';
import { useState } from 'react';
import classnames from 'classnames';
import classNames from 'classnames';

interface KanbanCheckboxSelectProps {
  options: KanbanSelectOption[];
  onValueSelect: (selectedValue: KanbanSelectOption['value']) => void;
  preSelectedValue?: string | number;
}

const KanbanCheckboxSelect = ({
  options,
  onValueSelect,
  preSelectedValue = undefined,
}: KanbanCheckboxSelectProps) => {
  const preSelectedOptionByValue = preSelectedValue
    ? options.find((option) => option.value === preSelectedValue)
    : null;
  const [selectedOption, setSelectedOption] = useState<KanbanSelectOption>(
    preSelectedOptionByValue ?? options[0]
  );

  const handleValueSelect = (selectedOption: KanbanSelectOption) => {
    setSelectedOption(selectedOption);
    onValueSelect(selectedOption.value);
  };

  return (
    <div className={classnames('flex gap-5')}>
      {options.map((option, index) => (
        <div
          key={`sort-selct-option-${index}-${option.value} `}
          className="group flex cursor-pointer items-center gap-2"
          onClick={() => handleValueSelect(option)}
        >
          <span
            className={classnames('group-hover:font-semibold', {
              'font-semibold':
                option.displayName === selectedOption.displayName,
            })}
          >
            {option.displayName}
          </span>
          <div className="border-custom-dark lative box-border h-4 w-4 rounded border p-px">
            <div
              className={classNames('h-full w-full rounded', {
                'bg-custom-dark':
                  option.displayName === selectedOption.displayName,
              })}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanCheckboxSelect;
