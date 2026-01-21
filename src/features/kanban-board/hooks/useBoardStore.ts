import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import Column from '../interfaces/Column.interface';
import Task from '../interfaces/Task.interface';
import { TaskSortOptions } from '../types/TaskSortOptions.type';

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

const defaultTasks: Task[] = [
  {
    id: 101,
    columnId: 1,
    title: 'Design UI',
    description: 'Create wireframes and mockups for the new feature.',
    priority: 1,
    creationDate: '2026-01-01T09:00:00Z',
    lastModifiedDate: '2026-01-01T09:00:00Z',
  },
  {
    id: 102,
    columnId: 1,
    title: 'Set up backend',
    description: 'Initialize the backend project and database.',
    priority: 2,
    creationDate: '2026-01-02T10:00:00Z',
    lastModifiedDate: '2026-01-02T10:00:00Z',
  },
  {
    id: 103,
    columnId: 3,
    title: 'Write documentation',
    description: 'Document the API endpoints and usage.',
    priority: 3,
    creationDate: '2026-01-03T11:00:00Z',
    lastModifiedDate: '2026-01-03T11:00:00Z',
  },
];

const defaultColumns: Column[] = [
  { id: 1, name: 'Todo' },
  { id: 2, name: 'In progress' },
  { id: 3, name: 'Done' },
];

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
      // storage: createJSONStorage(() => {
      //   // Make sure localstorage is not tried to be accessed while running on the server
      //   return typeof window !== 'undefined'
      //     ? localStorage
      //     : (undefined as unknown as Storage);
      // }),
    }
  )
);

export default useBoardStore;
