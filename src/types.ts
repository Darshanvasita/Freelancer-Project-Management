export interface Project {
  id: number;
  name: string;
  dueDate: string;
  status: 'active' | 'completed';
}

export interface Payment {
  id: number;
  projectId: number;
  amount: number;
  status: 'paid' | 'unpaid';
  date: string;
}