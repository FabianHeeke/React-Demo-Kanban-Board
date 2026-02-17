import classNames from 'classnames';

interface KanbanButtonProps {
  variant: 'primary' | 'secondary';
  isDisabled?: boolean;
  type?: 'submit' | 'reset' | 'button' | undefined;
  children: React.ReactNode;
}

const KanbanButton = ({
  variant,
  isDisabled = false,
  type = undefined,
  children,
}: KanbanButtonProps) => {
  return (
    <button
      disabled={isDisabled}
      type={type}
      className={classNames(
        'flex cursor-pointer items-center gap-2 rounded p-2 transition-colors',
        {
          'bg-custom-dark text-custom-light hover:opacity-95':
            variant === 'primary',
          'border border-transparent p-2 hover:border-black':
            variant === 'secondary',
          'cursor-default! opacity-50': isDisabled,
        }
      )}
    >
      {children}
    </button>
  );
};

export default KanbanButton;
