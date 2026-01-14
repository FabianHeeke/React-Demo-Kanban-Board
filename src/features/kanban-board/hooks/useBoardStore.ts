import { create } from 'zustand';
import Column from '../interfaces/Column.interface';
import Task from '../interfaces/Task.interface';

type MoveTaskToColumnProps = {
  draggedTask: Task;
  sourceColumnId: number;
  targetColumnId: number;
};

interface BoardState {
  columns: Column[];
  moveTaskToColumn: ({}: MoveTaskToColumnProps) => void;
}

const defaultTasks: Task[] = [
  {
    id: 101,
    title: 'Design UI',
    description: 'Create wireframes and mockups for the new feature.',
    priority: 1,
    creationDate: new Date('2026-01-01T09:00:00Z'),
    lastModifiedDate: new Date('2026-01-01T09:00:00Z'),
  },
  {
    id: 102,
    title: 'Set up backend',
    description: 'Initialize the backend project and database.',
    priority: 2,
    creationDate: new Date('2026-01-02T10:00:00Z'),
    lastModifiedDate: new Date('2026-01-02T10:00:00Z'),
  },
  {
    id: 103,
    title: 'Write documentation',
    description: 'Document the API endpoints and usage.',
    priority: 3,
    creationDate: new Date('2026-01-03T11:00:00Z'),
    lastModifiedDate: new Date('2026-01-03T11:00:00Z'),
  },
];

const columns: Column[] = [
  { id: 1, name: 'Todo', tasks: [defaultTasks[0], defaultTasks[1]] },
  { id: 2, name: 'In progress', tasks: [] },
  { id: 3, name: 'Done', tasks: [defaultTasks[2]] },
];

const useBoardStore = create<BoardState>((set) => ({
  columns: columns,
  moveTaskToColumn: ({ draggedTask, sourceColumnId, targetColumnId }) => {
    set((state) => {
      const columns = [...state.columns]; // shallow copy for mutatio

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
}));

export default useBoardStore;
