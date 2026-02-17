import Task from '../interfaces/Task.interface';

export const useTaskUtils = () => {
  const createTask = (taskParams: Partial<Task> = {}): Task => {
    const date = new Date();
    const defautTaskData: Task = {
      id: date.getTime(),
      title: '',
      description: '',
      columnId: 1,
      priority: 2,
      creationDate: date.toISOString(),
      lastModifiedDate: date.toISOString(),
    };

    return { ...defautTaskData, ...taskParams };
  };

  return { createTask };
};
