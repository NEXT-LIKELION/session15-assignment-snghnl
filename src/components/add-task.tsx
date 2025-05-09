import {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
    DialogContent,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { cn } from "@/lib/utils";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    FormDescription,
} from "./ui/form";
import { Input } from "./ui/input";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon, Plus } from "lucide-react";
import { useState } from "react";

import { createTask } from "../lib/crud";

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required",
    }),
    description: z.string().optional(),
    dueDate: z.date(),
});

const DatePicker = ({ field }: { field: any }) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? (
                        format(field.value, "PPP")
                    ) : (
                        <span>Pick a date</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => date && field.onChange(date)}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
};

const AddTaskForm = ({ onSuccess }: { onSuccess?: () => void }) => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            dueDate: new Date(),
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // send data to server
        console.log(values);
        if (onSuccess) onSuccess();
        createTask({ ...values, id: uuidv4() });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <div>
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    <FormDescription>
                                        Enter the title of the task.
                                    </FormDescription>
                                </FormItem>
                            </div>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description (optional)</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                                <FormDescription>
                                    Enter the description of the task.
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dueDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Due Date</FormLabel>
                                <FormControl>
                                    <DatePicker field={field} />
                                </FormControl>
                                <FormMessage />
                                <FormDescription>
                                    Enter the due date of the task.
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-end">
                    <Button variant="outline" type="submit">
                        <Plus className="mr-2 h-4 w-4" />
                        Add
                    </Button>
                </div>
            </form>
        </Form>
    );
};

const DialogAddTaskButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Add Task</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Task</DialogTitle>
                    <DialogDescription>
                        Add a new task to your list
                    </DialogDescription>
                </DialogHeader>
                <AddTaskForm onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
};

export default DialogAddTaskButton;
