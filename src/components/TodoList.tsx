import React from "react";
import TodoItem from "./TodoItem";
import { Plus, Calendar, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Todo } from "@/types/todo";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const TodoList = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [newTodo, setNewTodo] = React.useState("");
  const [category, setCategory] = React.useState("Personal");
  const [priority, setPriority] = React.useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = React.useState("");
  const [activeTaskId, setActiveTaskId] = React.useState<string | null>(null);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo,
      category,
      completed: false,
      priority,
      dueDate: dueDate || null,
      isActive: false,
    };

    setTodos([todo, ...todos]);
    setNewTodo("");
    setDueDate("");
    toast.success("Todo added successfully!");
  };

  const completeTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.success("Todo deleted successfully!");
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
    toast.success("Completed tasks cleared!");
  };

  const setTaskActive = (id: string) => {
    setActiveTaskId(id === activeTaskId ? null : id);
  };

  const incompleteTasks = todos.filter((todo) => !todo.completed);
  const completedTasks = todos.filter((todo) => todo.completed);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={addTodo} className="mb-8 space-y-4">
        <div className="flex gap-2">
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 bg-secondary/50 text-white"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-secondary/50 text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-accent/50"
          >
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Shopping">Shopping</option>
          </select>
          <Button type="submit" className="bg-accent hover:bg-accent/80">
            <Plus className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex gap-4">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
            className="bg-secondary/50 text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-accent/50"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>

          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="bg-secondary/50 text-white"
          />
        </div>
      </form>

      <div className="flex justify-between items-center mb-6">
        <div className="text-accent">
          {incompleteTasks.length} tasks remaining
        </div>
        <Button
          onClick={clearCompleted}
          variant="secondary"
          className="text-accent hover:text-white"
        >
          Clear Completed
        </Button>
      </div>

      <div className="space-y-6">
        {incompleteTasks.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4 text-white">Active Tasks</h2>
            <div className="space-y-2">
              {incompleteTasks.map((todo) => (
                <TodoItem
                  key={todo.id}
                  {...todo}
                  isActive={todo.id === activeTaskId}
                  onComplete={completeTodo}
                  onDelete={deleteTodo}
                  onSetActive={setTaskActive}
                />
              ))}
            </div>
          </div>
        )}

        {completedTasks.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4 text-white">Completed Tasks</h2>
            <div className="space-y-2">
              {completedTasks.map((todo) => (
                <TodoItem
                  key={todo.id}
                  {...todo}
                  isActive={todo.id === activeTaskId}
                  onComplete={completeTodo}
                  onDelete={deleteTodo}
                  onSetActive={setTaskActive}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;