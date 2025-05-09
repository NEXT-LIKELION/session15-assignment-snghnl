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

import { readTasks, type Task } from "./lib/crud";

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
                {tasks.map((task) => (
                    <div key={task.id}>{task.title}</div>
                ))}
            </CardContent>
            <CardFooter className="flex justify-end mt-auto">
                <DialogAddTaskButton />
            </CardFooter>
        </Card>
    );
}

export default App;
