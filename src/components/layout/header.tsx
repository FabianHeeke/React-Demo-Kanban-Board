import classnames from 'classnames';

interface HeaderProps {
  maxContentWidthClassName: string;
}

const Header = ({ maxContentWidthClassName }: HeaderProps) => {
  return (
    <div className="bg-custom-dark flex h-20 w-full justify-center">
      <div
        className={classnames(
          'grid w-full grid-cols-[1fr_auto_1fr] items-center',
          maxContentWidthClassName
        )}
      >
        <p className="text-custom-light">{'Das Projekt auf GitHub >'}</p>
        <h1 className="text-custom-light flex items-center">Kanban-Board</h1>
      </div>
    </div>
  );
};

export default Header;
