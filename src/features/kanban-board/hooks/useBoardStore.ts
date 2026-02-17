import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Column from '../interfaces/Column.interface';
import Task from '../interfaces/Task.interface';
import { TaskSortOptions } from '../types/TaskSortOptions.type';

type MoveTaskToColumnProps = {
  draggedTask: Task;
  sourceColumnId: number;
  targetColumnId: number;
};

interface BoardState {
  columns: Column[];
  sortTaskOptions: TaskSortOptions;
  updateSortTaskOptions: (newSortOptions: TaskSortOptions) => void;
  moveTaskToColumn: ({}: MoveTaskToColumnProps) => void;
  addTask: (task: Task, columnId: number) => void;
  updateTask: (updatedTask: Task) => void;
  deleteTask: (taskId: number) => void;
}

const defaultTasks: Task[] = [
  {
    id: 101,
    title: 'Design UI',
    description: 'Create wireframes and mockups for the new feature.',
    priority: 1,
    creationDate: '2026-01-01T09:00:00Z',
    lastModifiedDate: '2026-01-01T09:00:00Z',
  },
  {
    id: 102,
    title: 'Set up backend',
    description: 'Initialize the backend project and database.',
    priority: 2,
    creationDate: '2026-01-02T10:00:00Z',
    lastModifiedDate: '2026-01-02T10:00:00Z',
  },
  {
    id: 103,
    title: 'Write documentation',
    description: 'Document the API endpoints and usage.',
    priority: 3,
    creationDate: '2026-01-03T11:00:00Z',
    lastModifiedDate: '2026-01-03T11:00:00Z',
  },
];

const defaultColumns: Column[] = [
  { id: 1, name: 'Todo', tasks: [defaultTasks[0], defaultTasks[1]] },
  { id: 2, name: 'In progress', tasks: [] },
  { id: 3, name: 'Done', tasks: [defaultTasks[2]] },
];

const defaultTaskSortOptions: TaskSortOptions = {
  field: 'creationDate',
  direction: 'ASC',
};

const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      columns: defaultColumns,
      sortTaskOptions: defaultTaskSortOptions,
      updateSortTaskOptions: (newSortOptions: TaskSortOptions) => {
        set((state) => {
          const columns = JSON.parse(JSON.stringify(state.columns)) as Column[]; // deep copy for mutation

          columns.forEach((column) => {
            column.tasks.sort((taskA, taskB) => {
              const fieldName = newSortOptions.field;
              let valueA: number;
              let valueB: number;

              if (fieldName === 'creationDate') {
                valueA = new Date(taskA[fieldName]).getTime();
                valueB = new Date(taskB[fieldName]).getTime();
              } else {
                valueA = +taskA[fieldName];
                valueB = +taskB[fieldName];
              }

              return newSortOptions.direction === 'ASC'
                ? valueA - valueB
                : valueB - valueA;
            });
          });

          return {
            columns: columns,
            sortTaskOptions: newSortOptions,
          };
        });
      },
      moveTaskToColumn: ({ draggedTask, sourceColumnId, targetColumnId }) => {
        set((state) => {
          const columns = JSON.parse(JSON.stringify(state.columns)) as Column[]; // deep copy for mutation

          const sourceColumn = columns.find(
            (column) => column.id === sourceColumnId
          );
          const targetColumn = columns.find(
            (column) => column.id === targetColumnId
          );

          if (!sourceColumn || !targetColumn) {
            return state;
          }

          sourceColumn.tasks = sourceColumn.tasks.filter(
            (task) => task.id !== draggedTask.id
          );
          targetColumn.tasks.push(draggedTask);

          return { columns };
        });
      },
      addTask: (task, columnId) => {
        set((state) => {
          const columns = JSON.parse(JSON.stringify(state.columns)) as Column[];
          const targetColumn = columns.find((col) => col.id === columnId);
          if (targetColumn) {
            targetColumn.tasks.push(task);
          }
          return { columns };
        });
      },
      updateTask: (updatedTask) => {
        set((state) => {
          const columns = JSON.parse(JSON.stringify(state.columns)) as Column[];
          columns.forEach((column) => {
            const taskIndex = column.tasks.findIndex(
              (t) => t.id === updatedTask.id
            );
            if (taskIndex !== -1) {
              column.tasks[taskIndex] = updatedTask;
            }
          });
          return { columns };
        });
      },
      deleteTask: (taskId) => {
        set((state) => {
          const columns = JSON.parse(JSON.stringify(state.columns)) as Column[];
          columns.forEach((column) => {
            column.tasks = column.tasks.filter((t) => t.id !== taskId);
          });
          return { columns };
        });
      },
    }),
    {
      name: 'kanban-storage',
    }
  )
);

export default useBoardStore;
