import Task from '../interfaces/Task.interface';

export type TaskSortOptions = {
  field: keyof Pick<Task, 'creationDate' | 'priority'>;
  direction: 'ASC' | 'DESC';
};
