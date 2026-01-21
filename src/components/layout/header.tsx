import classnames from 'classnames';

interface HeaderProps {
  maxContentWidthClassName: string;
}

const Header = ({ maxContentWidthClassName }: HeaderProps) => {
  return (
    <div className="bg-custom-dark grid h-20 w-full grid-cols-[1fr_auto_1fr]">
      <div
        className={classnames(
          'flex h-full items-center',
          maxContentWidthClassName
        )}
      >
        <p className="text-custom-off-white">{'Das Projekt auf GitHub >'}</p>
      </div>
      <h1 className="text-custom-off-white flex items-center">Kanban-Board</h1>
    </div>
  );
};

export default Header;
