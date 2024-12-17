export interface Todo {
  id: string;
  text: string;
  category: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate: string | null;
  isActive: boolean;
}