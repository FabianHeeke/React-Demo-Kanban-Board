import classnames from 'classnames';
import { FaGithub } from 'react-icons/fa';
import { IoIosSettings } from 'react-icons/io';
import KanbanIcon from '../ui/KanbanIcon';
import KanbanButton from '../ui/KanbanButton';

interface HeaderProps {
  maxContentWidthClassName: string;
}

const Header = ({ maxContentWidthClassName }: HeaderProps) => {
  return (
    <div className="h-20 w-full bg-gray-100">
      <div
        className={classnames(
          'mx-auto flex h-full items-center justify-between',
          maxContentWidthClassName
        )}
      >
        <KanbanButton>
          <span>Projekt auf GitHub</span>
          <KanbanIcon icon={FaGithub} size={18} />
        </KanbanButton>
        <KanbanIcon icon={IoIosSettings} />
      </div>
    </div>
  );
};

export default Header;
