import TodoList from "@/components/TodoList";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
                <p className="text-secondary-foreground">Organize your tasks efficiently</p>
              </div>
              <SidebarTrigger />
            </div>
            <TodoList />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;