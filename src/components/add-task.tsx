import { Dialog, DialogHeader, DialogTitle, 
    DialogDescription, DialogTrigger, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";


const DialogAddTaskButton= () => {
    return (
        <Dialog>
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
            </DialogContent>
        </Dialog>
    )

}


export default DialogAddTaskButton;