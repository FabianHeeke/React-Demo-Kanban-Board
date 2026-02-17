import { useShallow } from 'zustand/react/shallow';
import useBoardStore from './useBoardStore';
import Task from '../interfaces/Task.interface';
import { useCallback } from 'react';

const useSortedColumnTasks = (columnId: number): Task[] => {
  const selector = useCallback(
    (state: ReturnType<typeof useBoardStore.getState>) => {
      const tasksInColumn = state.tasks.filter(
        (task) => task.columnId === columnId
      );
      const { field, direction } = state.sortTaskOptions;
      return [...tasksInColumn].sort((a, b) => {
        if (field === 'creationDate') {
          return direction === 'ASC'
            ? a.creationDate.localeCompare(b.creationDate)
            : b.creationDate.localeCompare(a.creationDate);
        } else {
          const valueA = Number(a[field]);
          const valueB = Number(b[field]);
          return direction === 'ASC' ? valueA - valueB : valueB - valueA;
        }
      });
    },
    [columnId]
  );
  return useBoardStore(useShallow(selector));
};

export default useSortedColumnTasks;
