export interface TaskStore {
  id: string;
  userId: string;
  title: string;
  description?: string;
  createdAt: number;
  completed: boolean;
}
