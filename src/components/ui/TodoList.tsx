import { readTasks, updateTask, type Task } from "@/lib/crud";
import { useEffect, useState } from "react";
import TaskActionsDialog from "@/components/TaskActionsDialog";

const TodoList = () => {
    const [tasks, setTasks] = useState<(Task & { id: string })[]>([]);

    useEffect(() => {
        readTasks().then(setTasks);
    }, []);

    // Handler for toggling completion
    const handleToggleCompleted = async (task: Task & { id: string }) => {
        await updateTask(task.id, { completed: !task.completed });
        setTasks((prev) =>
            prev
                .map((t) =>
                    t.id === task.id ? { ...t, completed: !t.completed } : t
                )
                .sort((a, b) => Number(a.completed) - Number(b.completed))
        );
    };

    // Add handlers to update/delete tasks in state after backend change
    const handleTaskUpdated = (updatedTask: Task & { id: string }) => {
        setTasks((prev) =>
            prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
        );
    };
    const handleTaskDeleted = (id: string) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <div className="flex flex-col gap-2">
            {tasks
                .slice()
                .sort((a, b) => Number(a.completed) - Number(b.completed))
                .map((task) => (
                    <div key={task.id} className="flex items-center gap-4">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleToggleCompleted(task)}
                            className="w-4 h-4"
                        />
                        <span
                            className={
                                task.completed
                                    ? "line-through text-gray-400"
                                    : ""
                            }
                        >
                            {task.title}
                        </span>
                        <span className="w-32 text-sm text-gray-500">
                            {task.dueDate
                                ? new Date(task.dueDate).toLocaleDateString()
                                : ""}
                        </span>
                        <TaskActionsDialog
                            task={task}
                            onUpdated={handleTaskUpdated}
                            onDeleted={handleTaskDeleted}
                        />
                    </div>
                ))}
        </div>
    );
};

export default TodoList;
