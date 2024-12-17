import TodoList from "@/components/TodoList";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-primary rounded-lg shadow-card p-6 mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">Tasks</h1>
          <p className="text-secondary-foreground">Organize your tasks efficiently</p>
        </div>
        <TodoList />
      </div>
    </div>
  );
};

export default Index;