import { db } from "@/lib/firebase";
import {
    doc,
    collection,
    addDoc,
    getDocs,
    getDoc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";

export type Task = {
    id: string;
    title: string;
    description?: string;
    dueDate: Date;
    completed: boolean;
};

export const createTask = (task: Task) => {
    const taskRef = collection(db, "tasks");
    addDoc(taskRef, task);
};

export const readTasks = async (): Promise<Task[]> => {
    const taskRef = collection(db, "tasks");
    const querySnapshot = await getDocs(taskRef);
    return querySnapshot.docs.map((doc) => doc.data() as Task);
};

export const getTaskById = async (id: string): Promise<Task> => {
    const taskRef = doc(db, "tasks", id);
    const querySnapshot = await getDoc(taskRef);
    return querySnapshot.data() as Task;
};

export const updateTask = async (id: string, task: Task) => {
    const taskRef = doc(db, "tasks", id);

    await updateDoc(taskRef, task);
};

export const deleteTask = async (id: string) => {
    const taskRef = doc(db, "tasks", id);
    await deleteDoc(taskRef);
};
