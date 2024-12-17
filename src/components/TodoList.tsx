import React, { useState } from "react";
import TodoItem from "./TodoItem";
import { Plus, Calendar, Trash2, Search, SunMoon, Download, Upload } from "lucide-react";
import { toast } from "sonner";
import { Todo } from "@/types/todo";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

type FilterStatus = 'all' | 'active' | 'completed';
type SortBy = 'priority' | 'dueDate' | 'none';

const TodoList = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [newTodo, setNewTodo] = React.useState("");
  const [category, setCategory] = React.useState("Personal");
  const [priority, setPriority] = React.useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = React.useState("");
  const [activeTaskId, setActiveTaskId] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [sortBy, setSortBy] = useState<SortBy>('none');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [recurring, setRecurring] = useState<'daily' | 'weekly' | 'monthly' | null>(null);
  const [reminder, setReminder] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
      recurring,
      reminder: reminder || null,
    };

    setTodos([todo, ...todos]);
    setNewTodo("");
    setDueDate("");
    setRecurring(null);
    setReminder("");
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

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo
      )
    );
    toast.success("Task updated successfully!");
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const exportTasks = () => {
    const dataStr = JSON.stringify(todos);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'todos.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importTasks = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedTodos = JSON.parse(e.target?.result as string);
          setTodos(importedTodos);
          toast.success("Tasks imported successfully!");
        } catch (error) {
          toast.error("Error importing tasks!");
        }
      };
      reader.readAsText(file);
    }
  };

  const filteredTodos = todos
    .filter((todo) => {
      const matchesSearch = todo.text.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus === 'all' 
        ? true 
        : filterStatus === 'completed' 
          ? todo.completed 
          : !todo.completed;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      if (sortBy === 'dueDate' && a.dueDate && b.dueDate) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      return 0;
    });

  const incompleteTasks = filteredTodos.filter((todo) => !todo.completed);
  const completedTasks = filteredTodos.filter((todo) => todo.completed);
  const progress = todos.length > 0 
    ? Math.round((todos.filter(t => t.completed).length / todos.length) * 100) 
    : 0;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className="w-64 bg-secondary/50 text-white"
          />
          <Button onClick={toggleTheme} variant="outline">
            <SunMoon className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={exportTasks}>
            <Download className="h-5 w-5" />
          </Button>
          <label className="cursor-pointer">
            <Input
              type="file"
              accept=".json"
              onChange={importTasks}
              className="hidden"
            />
            <Button as="div">
              <Upload className="h-5 w-5" />
            </Button>
          </label>
        </div>
      </div>

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

          <select
            value={recurring || ''}
            onChange={(e) => setRecurring(e.target.value as 'daily' | 'weekly' | 'monthly' | null)}
            className="bg-secondary/50 text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-accent/50"
          >
            <option value="">No Recurring</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>

          <Input
            type="datetime-local"
            value={reminder}
            onChange={(e) => setReminder(e.target.value)}
            className="bg-secondary/50 text-white"
            placeholder="Set reminder"
          />
        </div>
      </form>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="text-accent">
            {incompleteTasks.length} tasks remaining
          </div>
          <div className="text-accent">
            Progress: {progress}%
          </div>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="bg-secondary/50 text-white rounded-lg p-2 text-sm"
          >
            <option value="none">Sort by</option>
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
          </select>
          <div className="flex gap-2">
            <Button
              onClick={() => setFilterStatus('all')}
              variant={filterStatus === 'all' ? 'default' : 'secondary'}
              size="sm"
            >
              All
            </Button>
            <Button
              onClick={() => setFilterStatus('active')}
              variant={filterStatus === 'active' ? 'default' : 'secondary'}
              size="sm"
            >
              Active
            </Button>
            <Button
              onClick={() => setFilterStatus('completed')}
              variant={filterStatus === 'completed' ? 'default' : 'secondary'}
              size="sm"
            >
              Completed
            </Button>
          </div>
          <Button
            onClick={clearCompleted}
            variant="secondary"
            className="text-accent hover:text-white"
          >
            Clear Completed
          </Button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="space-y-6">
          {incompleteTasks.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4 text-white">Active Tasks</h2>
              <SortableContext
                items={incompleteTasks.map(todo => todo.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {incompleteTasks.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      {...todo}
                      isActive={todo.id === activeTaskId}
                      onComplete={completeTodo}
                      onDelete={deleteTodo}
                      onSetActive={setTaskActive}
                      onUpdate={updateTodo}
                    />
                  ))}
                </div>
              </SortableContext>
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
                    onUpdate={updateTodo}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </DndContext>
    </div>
  );
};

export default TodoList;