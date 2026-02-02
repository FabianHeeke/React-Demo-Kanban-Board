import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Column from '../interfaces/Column.interface';
import Task from '../interfaces/Task.interface';
import { TaskSortOptions } from '../types/TaskSortOptions.type';
import tasksJson from '../../../../json/tasks.json';
import columnsJson from '../../../../json/columns.json';

interface BoardState {
  tasks: Task[];
  columns: Column[];
  sortTaskOptions: TaskSortOptions;
  updateSortTaskOptions: (newSortOptions: TaskSortOptions) => void;
  moveTaskToColumn: (
    draggedTaskId: Task['id'],
    targetColumnId: Column['id']
  ) => void;
  addTask: (newTask: Task) => void;
  updateTask: (updatedTask: Task) => void;
  deleteTask: (deleteTaskId: number) => void;
}

const defaultTasks: Task[] = tasksJson as Task[];

const defaultColumns: Column[] = columnsJson as Column[];

const defaultTaskSortOptions: TaskSortOptions = {
  field: 'creationDate',
  direction: 'ASC',
};

const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      tasks: defaultTasks,
      columns: defaultColumns,
      sortTaskOptions: defaultTaskSortOptions,
      updateSortTaskOptions: (newSortOptions: TaskSortOptions) => {
        set(() => {
          return {
            sortTaskOptions: newSortOptions,
          };
        });
      },
      moveTaskToColumn: (draggedTaskId, targetColumnId) => {
        set((state) => {
          const tasks = state.tasks.map((task) =>
            task.id === draggedTaskId
              ? { ...task, columnId: targetColumnId }
              : task
          );

          return {
            tasks,
          };
        });
      },
      addTask: (newTask) => {
        set((state) => {
          return { tasks: [...state.tasks, newTask] };
        });
      },
      updateTask: (updatedTask) => {
        set((state) => {
          const tasks = state.tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          );
          return { tasks };
        });
      },
      deleteTask: (deleteTaskId) => {
        set((state) => {
          return {
            tasks: state.tasks.filter((task) => task.id !== deleteTaskId),
          };
        });
      },
    }),
    {
      name: 'kanban-storage',
    }
  )
);

export default useBoardStore;
