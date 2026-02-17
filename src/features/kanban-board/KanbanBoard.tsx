'use client';
import { useState, useCallback } from 'react';
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
  const columns = useBoardStore((state) => state.columns);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { sensors, onCardDragEnd } = useTaskCardDrag();

  const handleEditTask = useCallback((task: Task) => {
    setEditingTask(task);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsCreateModalOpen(false);
    setEditingTask(null);
  }, []);

  return (
    <div className="flex h-full w-full max-w-screen flex-col justify-center gap-4">
      <div className="flex justify-between">
        <SortControls />
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="rounded p-1 hover:bg-gray-100"
        >
          <KanbanIcon icon={FaPlus} />
        </button>
      </div>
      <DndContext sensors={sensors} onDragEnd={onCardDragEnd}>
        <div className="border-custom-dark grid h-full grid-cols-3 overflow-hidden rounded border">
          {columns.map((column) => (
            <BoardColumn
              key={`column-${column.id}`}
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
