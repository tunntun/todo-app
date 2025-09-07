"use client";

import { useEffect, useState } from "react";
import TaskCard from "@/components/TaskCard";
import styles from "../styles/page.module.css";


type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newStatus, setNewStatus] = useState("pending");

  useEffect(() => {
    fetch("http://localhost:4000")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const res = await fetch("http://localhost:4000", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newTitle,
        description: newDescription,
        status: newStatus
      }),
    });

    const newTask: Task = await res.json();
    setTasks([...tasks, newTask]);
    setNewTitle("");
  };

  const toggleTask = async (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const updated = {
      ...task,
      status: task.status === "done" ? "pending" : "done",
    };

    await fetch(`http://localhost:4000/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    setTasks(tasks.map((t) => (t.id === id ? updated : t)));
  };

  const deleteTask = async (id: number) => {
    await fetch(`http://localhost:4000/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const todoTasks = tasks.filter((t) => t.status !== "done");
  const doneTasks = tasks.filter((t) => t.status === "done");

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Todo List</h1>

      {/* Input */}
      <form onSubmit={addTask} className={styles.submitButtonWrapper}>
        <input
          type="text"
          placeholder="Task title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className={styles.taskCreateText}
          required
        />

        <input
          type="text"
          placeholder="Task description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          className={styles.taskCreateText}
        />

        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          className={styles.taskCreateText}
        >
          <option value="pending">Pending</option>
          <option value="done">Done</option>
        </select>

        <button type="submit" className={styles.submitButton}>+</button>
      </form>

      {/* To do section */}
      <h2>Tasks to do - {todoTasks.length}</h2>
      {todoTasks.map((task) => (
        <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
      ))}

      {/* Done section */}
      <h2 className={styles.doneTitleText}>Done - {doneTasks.length}</h2>
      {doneTasks.map((task) => (
        <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
      ))}
    </main>
  );
}