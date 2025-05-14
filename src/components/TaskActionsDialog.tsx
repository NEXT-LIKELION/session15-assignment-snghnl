import { useState } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { updateTask, deleteTask, type Task, getIdByTitle } from "@/lib/crud";
import { MoreVertical } from "lucide-react";

function getDateString(val: any) {
    const d = new Date(val);
    return isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
}

export default function TaskActionsDialog({
    task,
    onUpdated,
    onDeleted,
}: {
    task: Task;
    onUpdated: (task: Task) => void;
    onDeleted: (id: string) => void;
}) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [dueDate, setDueDate] = useState(getDateString(task.dueDate));

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const id = await getIdByTitle(task.title);

        if (!id) {
            console.error("Task not found");
            return;
        }
        const updatedTask = { ...task, title, dueDate: new Date(dueDate) };
        await updateTask(id, updatedTask);
        onUpdated(updatedTask);
        setOpen(false);
    };

    const handleDelete = async () => {
        const id = await getIdByTitle(task.title);

        if (!id) {
            console.error("Task not found");
            return;
        }
        await deleteTask(id);
        onDeleted(id);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-auto">
                    <MoreVertical className="w-5 h-5" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit or Delete Task</DialogTitle>
                    <DialogDescription>
                        Update the task or delete it permanently.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleUpdate} className="space-y-4">
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                    />
                    <Input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        defaultValue={dueDate}
                    />
                    <div className="flex gap-2 justify-end">
                        <Button type="submit" variant="outline">
                            Update
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
