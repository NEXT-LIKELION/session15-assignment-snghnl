"use client";

import "./App.css";
import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./components/ui/card";
import DialogAddTaskButton from "./components/add-task";

import { updateTask, readTasks, type Task } from "./lib/crud";

import { Checkbox } from "@/components/ui/checkbox";
function App() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        readTasks().then(setTasks);
    }, []);

    return (
        <Card className="w-[350px] h-[400px]">
            <CardHeader className="flex flex-col">
                <CardTitle>Todo List</CardTitle>
                <CardDescription>Manage your tasks</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-2">
                    {tasks.length === 0 ? (
                        <span>No tasks</span>
                    ) : (
                        tasks.map((task) => {
                            return (
                                <div
                                    key={task.id}
                                    className="flex flex-row gap-2"
                                >
                                    <Checkbox
                                        id={task.id}
                                        checked={task.completed}
                                        onCheckedChange={() => {
                                            updateTask(task.id, {
                                                ...task,
                                                completed: !task.completed,
                                            });
                                        }}
                                    />
                                    <div>{task.title}</div>
                                </div>
                            );
                        })
                    )}
                </div>
            </CardContent>
            <CardFooter className="flex justify-end mt-auto">
                <DialogAddTaskButton />
            </CardFooter>
        </Card>
    );
}

export default App;
