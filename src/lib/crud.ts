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
    title: string;
    description?: string;
    dueDate: Date;
    completed: boolean;
};

export const createTask = async (task: Task): Promise<string> => {
    const taskRef = collection(db, "tasks");
    const docRef = await addDoc(taskRef, task);
    return docRef.id;
};

export const readTasks = async (): Promise<(Task & { id: string })[]> => {
    const taskRef = collection(db, "tasks");
    const querySnapshot = await getDocs(taskRef);
    return querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            dueDate:
                data.dueDate &&
                typeof data.dueDate === "object" &&
                "toDate" in data.dueDate
                    ? data.dueDate.toDate()
                    : data.dueDate,
        } as Task & { id: string };
    });
};

export const getTaskById = async (
    id: string
): Promise<(Task & { id: string }) | undefined> => {
    const taskRef = doc(db, "tasks", id);
    const querySnapshot = await getDoc(taskRef);
    return querySnapshot.exists()
        ? ({ id: querySnapshot.id, ...querySnapshot.data() } as Task & {
              id: string;
          })
        : undefined;
};

export const getIdByTitle = async (
    title: string
): Promise<string | undefined> => {
    const taskRef = collection(db, "tasks");
    const querySnapshot = await getDocs(taskRef);
    const doc = querySnapshot.docs.find((doc) => doc.data().title === title);
    return doc ? doc.id : undefined;
};

export const updateTask = async (id: string, updates: Partial<Task>) => {
    const taskRef = doc(db, "tasks", id);
    await updateDoc(taskRef, updates);
};

export const deleteTask = async (id: string) => {
    const taskRef = doc(db, "tasks", id);
    await deleteDoc(taskRef);
};
