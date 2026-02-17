import classnames from 'classnames';
import { FaGithub } from 'react-icons/fa';
import { IoIosSettings } from 'react-icons/io';

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
        <button className="flex cursor-pointer items-center gap-2 rounded border border-black p-2">
          Projekt auf GitHub
          <FaGithub />
        </button>

        <IoIosSettings />
      </div>
    </div>
  );
};

export default Header;
