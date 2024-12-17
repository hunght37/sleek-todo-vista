import React from "react";
import TodoItem from "./TodoItem";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface Todo {
  id: string;
  text: string;
  category: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [newTodo, setNewTodo] = React.useState("");
  const [category, setCategory] = React.useState("Personal");

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo,
      category,
      completed: false,
    };

    setTodos([todo, ...todos]);
    setNewTodo("");
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

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={addTodo} className="mb-8">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 bg-secondary/50 text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-accent/50"
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
          <button
            type="submit"
            className="bg-accent hover:bg-accent/80 text-white rounded-lg p-3 transition-colors duration-200"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>
      </form>

      <div className="space-y-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            onComplete={completeTodo}
            onDelete={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;