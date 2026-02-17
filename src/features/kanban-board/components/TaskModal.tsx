import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Task from '../interfaces/Task.interface';
import useBoardStore from '../hooks/useBoardStore';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskToEdit?: Task | null;
  defaultColumnId?: number;
}

const TaskModal = ({
  isOpen,
  onClose,
  taskToEdit,
  defaultColumnId = 1,
}: TaskModalProps) => {
  const { addTask, updateTask } = useBoardStore();
  // Initialize state based on taskToEdit
  const [title, setTitle] = useState(taskToEdit?.title || '');
  const [description, setDescription] = useState(taskToEdit?.description || '');
  const [priority, setPriority] = useState<1 | 2 | 3>(
    taskToEdit?.priority || 1
  );
  const [isDirty, setIsDirty] = useState(false);

  const handleClose = () => {
    if (isDirty) {
      if (
        window.confirm(
          'You have unsaved changes. Are you sure you want to close?'
        )
      ) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    const now = new Date().toISOString();

    if (taskToEdit) {
      const updatedTask: Task = {
        ...taskToEdit,
        title,
        description,
        priority,
        lastModifiedDate: now,
      };
      updateTask(updatedTask);
    } else {
      const newTask: Task = {
        id: Date.now(),
        title,
        description,
        priority,
        creationDate: now,
        lastModifiedDate: now,
      };
      addTask(newTask, defaultColumnId);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={taskToEdit ? 'Edit Task' : 'Create New Task'}
    >
      <div className="flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Title</label>
          <input
            type="text"
            className="w-full rounded border border-gray-300 p-2"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setIsDirty(true);
            }}
            placeholder="Task Title"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Description</label>
          <textarea
            className="w-full rounded border border-gray-300 p-2"
            rows={3}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setIsDirty(true);
            }}
            placeholder="Task Description"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Priority</label>
          <select
            className="w-full rounded border border-gray-300 p-2"
            value={priority}
            onChange={(e) => {
              setPriority(Number(e.target.value) as 1 | 2 | 3);
              setIsDirty(true);
            }}
          >
            <option value={1}>High (Red)</option>
            <option value={2}>Medium (Orange)</option>
            <option value={3}>Low (Blue)</option>
          </select>
        </div>

        {taskToEdit && (
          <div className="text-xs text-gray-500">
            <p>Created: {new Date(taskToEdit.creationDate).toLocaleString()}</p>
            <p>
              Last Modified:{' '}
              {new Date(taskToEdit.lastModifiedDate).toLocaleString()}
            </p>
          </div>
        )}

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="rounded px-4 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TaskModal;
