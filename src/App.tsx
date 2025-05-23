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
} from "@/components/ui/card";

import DialogAddTaskButton from "@/components/add-task";
import TodoList from "@/components/ui/TodoList";

function App() {
    return (
        <Card className="w-[350px] h-[400px]">
            <CardHeader className="flex flex-col">
                <CardTitle>Todo List</CardTitle>
                <CardDescription>Manage your tasks</CardDescription>
            </CardHeader>
            <CardContent>
                <TodoList />
            </CardContent>
            <CardFooter className="flex justify-end mt-auto">
                <DialogAddTaskButton />
            </CardFooter>
        </Card>
    );
}

export default App;
