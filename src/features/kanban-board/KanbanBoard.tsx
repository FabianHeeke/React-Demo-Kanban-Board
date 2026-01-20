'use client';
import { useState } from 'react';
import { BoardColumn } from './components/BoardColumn';
import useTaskCardDrag from './hooks/useTaskCardDrag';
import useBoardStore from './hooks/useBoardStore';
import { DndContext } from '@dnd-kit/core';
import { FaPlus } from 'react-icons/fa6';
import KanbanIcon from '@/components/ui/KanbanIcon';
import SortControls from './components/SortControls';
import TaskModal from './components/TaskModal';
import Task from './interfaces/Task.interface';

const KanbanBoard = () => {
  const { columns } = useBoardStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const { sensors, onCardDragEnd } = useTaskCardDrag();

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="mt-8 flex max-w-full flex-col gap-4">
      <div className="flex justify-between px-2">
        <SortControls />
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="rounded p-1 hover:bg-gray-100"
        >
          <KanbanIcon icon={FaPlus} />
        </button>
      </div>
      <DndContext sensors={sensors} onDragEnd={onCardDragEnd}>
        <div className="flex h-full max-h-screen min-h-[50vh] justify-center gap-4">
          {columns.map((column, index) => (
            <BoardColumn
              key={index}
              column={column}
              onEditTask={handleEditTask}
            />
          ))}
        </div>
      </DndContext>
      <TaskModal
        key={editingTask ? editingTask.id : 'create'}
        isOpen={isCreateModalOpen || !!editingTask}
        onClose={handleCloseModal}
        taskToEdit={editingTask}
      />
    </div>
  );
};

export default KanbanBoard;
