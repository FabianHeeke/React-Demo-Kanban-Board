import { create } from 'zustand';
import Column from '../interfaces/Column.interface';

interface BoardState {
  columns: Column[];
  tasks: [];
}

const initialColumns: Column[] = [
  { name: 'Todo', tasks: [] },
  { name: 'In progress', tasks: [] },
  { name: 'Done', tasks: [] },
];

const useBoardStore = create<BoardState>(() => ({
  columns: initialColumns,
  tasks: [],
}));

export default useBoardStore;
