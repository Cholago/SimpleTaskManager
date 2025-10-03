export interface Task {
  id?: number;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum TaskStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED'
}

