export default interface Task {
  id: number;
  title: string;
  description: string;
  priority: 1 | 2 | 3;
  columnId: number;
  creationDate: string;
  lastModifiedDate: string;
}
