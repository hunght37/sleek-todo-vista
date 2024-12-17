import React from "react";
import { Check, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  id: string;
  text: string;
  category: string;
  completed: boolean;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem = ({ id, text, category, completed, onComplete, onDelete }: TodoItemProps) => {
  return (
    <div
      className={cn(
        "group flex items-center justify-between p-4 mb-2 rounded-lg transition-all duration-200",
        "bg-secondary/50 backdrop-blur-sm hover:bg-secondary",
        "animate-slideIn",
        completed && "opacity-50"
      )}
    >
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onComplete(id)}
          className={cn(
            "w-6 h-6 rounded-full border-2 flex items-center justify-center",
            "transition-colors duration-200",
            completed ? "border-accent bg-accent" : "border-accent"
          )}
        >
          {completed && <Check size={14} className="text-white" />}
        </button>
        <div className="flex flex-col">
          <span className={cn(
            "text-white transition-all duration-200",
            completed && "line-through"
          )}>
            {text}
          </span>
          <span className="text-xs text-accent">{category}</span>
        </div>
      </div>
      <button
        onClick={() => onDelete(id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <Trash2 className="h-5 w-5 text-accent hover:text-red-400 transition-colors" />
      </button>
    </div>
  );
};

export default TodoItem;