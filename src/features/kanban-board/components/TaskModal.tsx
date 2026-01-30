import Modal from '@/components/ui/Modal';
import Task from '../interfaces/Task.interface';
import useBoardStore from '../hooks/useBoardStore';
import TaskForm from './TaskForm';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskToEdit?: Task;
  createTaskParams?: Partial<Task>;
}

const TaskModal = ({
  isOpen,
  onClose,
  taskToEdit,
  createTaskParams,
}: TaskModalProps) => {
  const { addTask, updateTask } = useBoardStore();

  const handleSave = (newTask: Task) => {
    if (taskToEdit !== undefined) {
      updateTask(newTask);
    } else {
      addTask(newTask);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={taskToEdit ? 'Edit Task' : 'Create New Task'}
      backgroundColorClass="bg-custom-light"
    >
      <TaskForm
        onSubmit={handleSave}
        taskParams={taskToEdit || createTaskParams}
      />
    </Modal>
  );
};

export default TaskModal;
