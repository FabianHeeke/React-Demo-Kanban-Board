import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';
import KanbanIcon from './KanbanIcon';
import classNames from 'classnames';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  backgroundColorClass?: string;
}

const Modal = ({
  isOpen,
  onClose,
  children,
  title = '',
  backgroundColorClass = 'bg-white',
}: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup, if modal is closed in another way
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={classNames(
        'fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'
      )}
      onClick={onClose}
    >
      <div
        className={classNames(
          'w-full max-w-md rounded-lg p-6 shadow-xl',
          `${backgroundColorClass ?? ''}`
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={classNames('mb-4 flex items-center justify-between')}>
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="cursor-pointer rounded p-1"
            aria-label="Close modal"
          >
            <KanbanIcon icon={IoClose} size={24} />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
