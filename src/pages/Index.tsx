import TodoList from "@/components/TodoList";

const Index = () => {
  return (
    <div className="min-h-screen bg-primary text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Tasks</h1>
        <p className="text-accent mb-8">Organize your tasks efficiently</p>
        <TodoList />
      </div>
    </div>
  );
};

export default Index;