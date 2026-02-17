import { create } from 'zustand';
import Column from '../interfaces/Column.interface';
import Task from '../interfaces/Task.interface';

interface BoardState {
  columns: Column[];
}

const defaultTasks: Task[] = [
  {
    title: 'Design UI',
    description: 'Create wireframes and mockups for the new feature.',
    priority: 1,
    creationDate: new Date('2026-01-01T09:00:00Z'),
    lastModifiedDate: new Date('2026-01-01T09:00:00Z'),
  },
  {
    title: 'Set up backend',
    description: 'Initialize the backend project and database.',
    priority: 2,
    creationDate: new Date('2026-01-02T10:00:00Z'),
    lastModifiedDate: new Date('2026-01-02T10:00:00Z'),
  },
  {
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

const useBoardStore = create<BoardState>(() => ({
  columns: columns,
  tasks: [],
}));

export default useBoardStore;
