'use client';
import { useState } from 'react';
import { BoardColumn } from './components/BoardColumn';
import useTaskCardDrag from './hooks/useTaskCardDrag';
import useBoardStore from './hooks/useBoardStore';
import { DndContext } from '@dnd-kit/core';
import SortControls from './components/SortControls';
import TaskModal from './components/TaskModal';
import Task from './interfaces/Task.interface';

const KanbanBoard = () => {
  const columns = useBoardStore((state) => state.columns);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [createTaskParams, setCreateTaskParams] =
    useState<Partial<Task> | null>(null);
  const { sensors, onCardDragEnd } = useTaskCardDrag();

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsTaskModalOpen(true);
  };

  const handleCreateTask = (createTaskParams: Partial<Task>) => {
    setCreateTaskParams(createTaskParams);
    setIsTaskModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsTaskModalOpen(false);
    setTaskToEdit(null);
    setCreateTaskParams(null);
  };

  return (
    <div className="flex h-full w-full max-w-screen flex-col justify-center gap-4">
      <SortControls />
      <DndContext sensors={sensors} onDragEnd={onCardDragEnd}>
        <div className="border-custom-dark grid h-full grid-cols-3 overflow-hidden rounded border">
          {columns.map((column) => (
            <BoardColumn
              key={`column-${column.id}`}
              column={column}
              onEditTask={handleEditTask}
              onCreateTask={handleCreateTask}
            />
          ))}
        </div>
      </DndContext>
      <TaskModal
        key={taskToEdit ? taskToEdit.id : 'create'}
        isOpen={isTaskModalOpen}
        onClose={handleCloseModal}
        taskToEdit={taskToEdit}
        createTaskParams={createTaskParams}
      />
    </div>
  );
};

export default KanbanBoard;
