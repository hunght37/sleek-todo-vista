export interface Todo {
  id: string;
  text: string;
  category: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate: string | null;
  isActive: boolean;
  notes?: string;
  subtasks?: Todo[];
  recurring?: 'daily' | 'weekly' | 'monthly' | null;
  reminder?: string | null;
}