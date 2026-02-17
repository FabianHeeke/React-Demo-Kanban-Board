import { useShallow } from 'zustand/react/shallow';
import useBoardStore from './useBoardStore';
import Task from '../interfaces/Task.interface';

const useColumnTasks = (columnId: number): Record<string, Task[]> => {
  const sortedTasksForColumn = useBoardStore(
    useShallow((state) => {
      const tasksInColumn = state.tasks.filter(
        (task) => task.columnId === columnId
      );

      const { field, direction } = state.sortTaskOptions;
      return [...tasksInColumn].sort((a, b) => {
        let valueA: number;
        let valueB: number;
        if (field === 'creationDate') {
          valueA = new Date(a.creationDate).getTime();
          valueB = new Date(b.creationDate).getTime();
        } else {
          valueA = Number(a[field]);
          valueB = Number(b[field]);
        }
        return direction === 'ASC' ? valueA - valueB : valueB - valueA;
      });
    })
  );

  return { sortedTasksForColumn };
};

export default useColumnTasks;
