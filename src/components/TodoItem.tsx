import React, { useState } from "react";
import { Check, Trash2, Calendar, Edit2, ChevronDown, ChevronUp, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Todo } from "@/types/todo";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

interface TodoItemProps {
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
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onSetActive: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
}

const priorityColors = {
  low: "bg-blue-400",
  medium: "bg-yellow-400",
  high: "bg-red-400",
};

const TodoItem = ({
  id,
  text,
  category,
  completed,
  priority,
  dueDate,
  isActive,
  notes,
  subtasks,
  recurring,
  reminder,
  onComplete,
  onDelete,
  onSetActive,
  onUpdate,
}: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const [editedNotes, setEditedNotes] = useState(notes || "");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showSubtasks, setShowSubtasks] = useState(false);

  const handleUpdate = () => {
    onUpdate(id, { text: editedText, notes: editedNotes });
    setIsEditing(false);
  };

  return (
    <>
      <div
        onClick={() => !isEditing && onSetActive(id)}
        className={cn(
          "group flex flex-col p-4 mb-3 rounded-lg transition-all duration-200",
          "bg-primary shadow-card hover:shadow-hover",
          "animate-slideIn cursor-pointer border border-gray-100",
          completed && "opacity-75",
          isActive && "ring-2 ring-accent"
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onComplete(id);
              }}
              className={cn(
                "w-6 h-6 rounded-full border-2 flex items-center justify-center p-0",
                "transition-colors duration-200",
                completed ? "border-accent bg-accent" : "border-accent"
              )}
            >
              {completed && <Check size={14} className="text-white" />}
            </Button>
            
            {isEditing ? (
              <div className="flex flex-col gap-2 w-full" onClick={(e) => e.stopPropagation()}>
                <Input
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="bg-secondary"
                  onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
                />
                <Textarea
                  value={editedNotes}
                  onChange={(e) => setEditedNotes(e.target.value)}
                  placeholder="Add notes..."
                  className="bg-secondary"
                />
                <Button
                  onClick={handleUpdate}
                  variant="ghost"
                  className="text-accent hover:text-accent/80"
                >
                  Save
                </Button>
              </div>
            ) : (
              <div className="flex flex-col">
                <span className={cn(
                  "text-foreground font-medium transition-all duration-200",
                  completed && "line-through text-secondary-foreground"
                )}>
                  {text}
                </span>
                <div className="flex items-center gap-2 text-xs mt-1">
                  <span className="text-secondary-foreground bg-secondary px-2 py-1 rounded">
                    {category}
                  </span>
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    priorityColors[priority]
                  )} />
                  {dueDate && (
                    <div className="flex items-center text-secondary-foreground">
                      <Calendar size={12} className="mr-1" />
                      {format(new Date(dueDate), "MMM d, yyyy")}
                    </div>
                  )}
                  {recurring && (
                    <span className="text-secondary-foreground">
                      Recurring: {recurring}
                    </span>
                  )}
                  {reminder && (
                    <div className="flex items-center text-secondary-foreground">
                      <Bell size={12} className="mr-1" />
                      {format(new Date(reminder), "MMM d, HH:mm")}
                    </div>
                  )}
                </div>
                {notes && (
                  <p className="text-sm text-secondary-foreground mt-2 bg-secondary p-2 rounded">
                    {notes}
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(!isEditing);
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <Edit2 className="h-5 w-5 text-secondary-foreground hover:text-accent transition-colors" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteDialog(true);
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <Trash2 className="h-5 w-5 text-secondary-foreground hover:text-destructive transition-colors" />
            </Button>
            {subtasks && subtasks.length > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSubtasks(!showSubtasks);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                {showSubtasks ? (
                  <ChevronUp className="h-5 w-5 text-secondary-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-secondary-foreground" />
                )}
              </Button>
            )}
          </div>
        </div>
        
        {showSubtasks && subtasks && (
          <div className="mt-4 ml-8">
            {subtasks.map((subtask) => (
              <TodoItem
                key={subtask.id}
                {...subtask}
                onComplete={onComplete}
                onDelete={onDelete}
                onSetActive={onSetActive}
                onUpdate={onUpdate}
              />
            ))}
          </div>
        )}
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDelete(id);
                setShowDeleteDialog(false);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TodoItem;
