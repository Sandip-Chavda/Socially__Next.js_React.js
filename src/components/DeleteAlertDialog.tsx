import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Loader2Icon, LucideTrash, Trash2Icon } from "lucide-react";

interface DeleteAlertDialogProps {
  isDeleting: boolean;
  onDelete: () => Promise<void>;
  title?: string;
  description?: string;
}

const DeleteAlertDialog = ({
  isDeleting,
  onDelete,
  title = "Delete Post",
  description = "This action cannot be undone.",
}: DeleteAlertDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" className="hover:scale-95 -mr-2">
          {isDeleting ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <LucideTrash className="size-4 fill-current text-red-500" />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlertDialog;
