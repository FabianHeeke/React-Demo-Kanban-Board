import { create } from 'zustand';

interface BoardState {
  columns: string[];
  tasks: [];
}

const initialColumns = ['Todo', 'In progress', 'Done'];

const useBoardStore = create<BoardState>(() => ({
  columns: initialColumns,
  tasks: [],
}));

export default useBoardStore;
