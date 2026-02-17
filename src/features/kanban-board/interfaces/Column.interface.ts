import Task from './Task.interface';

export default interface Column {
  id: number;
  name: string;
  tasks: Task[];
}
