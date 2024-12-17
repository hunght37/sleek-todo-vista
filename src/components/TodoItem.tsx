import React from "react";
import { Check, Trash2, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface TodoItemProps {
  id: string;
  text: string;
  category: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate: string | null;
  isActive: boolean;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onSetActive: (id: string) => void;
}

const priorityColors = {
  low: "bg-blue-500",
  medium: "bg-yellow-500",
  high: "bg-red-500",
};

const TodoItem = ({
  id,
  text,
  category,
  completed,
  priority,
  dueDate,
  isActive,
  onComplete,
  onDelete,
  onSetActive,
}: TodoItemProps) => {
  return (
    <div
      onClick={() => onSetActive(id)}
      className={cn(
        "group flex items-center justify-between p-4 mb-2 rounded-lg transition-all duration-200",
        "bg-secondary/50 backdrop-blur-sm hover:bg-secondary",
        "animate-slideIn cursor-pointer",
        completed && "opacity-50",
        isActive && "ring-2 ring-accent"
      )}
    >
      <div className="flex items-center space-x-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onComplete(id);
          }}
          className={cn(
            "w-6 h-6 rounded-full border-2 flex items-center justify-center",
            "transition-colors duration-200",
            completed ? "border-accent bg-accent" : "border-accent"
          )}
        >
          {completed && <Check size={14} className="text-white" />}
        </button>
        <div className="flex flex-col">
          <span
            className={cn(
              "text-white transition-all duration-200",
              completed && "line-through"
            )}
          >
            {text}
          </span>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-accent">{category}</span>
            <div
              className={cn(
                "w-2 h-2 rounded-full",
                priorityColors[priority]
              )}
            />
            {dueDate && (
              <div className="flex items-center text-accent">
                <Calendar size={12} className="mr-1" />
                {format(new Date(dueDate), "MMM d, yyyy")}
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(id);
        }}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <Trash2 className="h-5 w-5 text-accent hover:text-red-400 transition-colors" />
      </button>
    </div>
  );
};

export default TodoItem;