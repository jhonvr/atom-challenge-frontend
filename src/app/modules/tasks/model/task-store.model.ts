export interface TaskStore {
  id: string;
  userId: string;
  title: string;
  description?: string;
  createdAt: number;
  updatedAt?: number;
  completed?: boolean;
  deleted?: boolean;
  deletedAt?: number;
}

export interface Task {
  title: string;
  description?: string;
}
