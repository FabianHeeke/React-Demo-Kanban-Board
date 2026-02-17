export default interface Task {
  id: number;
  title: string;
  description: string;
  priority: 3 | 2 | 1;
  columnId: number;
  creationDate: string;
  lastModifiedDate: string;
}
