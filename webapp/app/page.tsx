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
      body: JSON.stringify({ title: newTitle, status: "pending" }),
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
    <main>
      <h1 className="styles.title">Todo List</h1>

      {/* Input */}
      <form onSubmit={addTask} style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Add a new task"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #444",
            background: "#1a1a1a",
            color: "#eee",
          }}
        />
        <button
          type="submit"
          style={{
            background: "#6b46c1",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
          +
        </button>
      </form>

      {/* To do section */}
      <h2>Tasks to do - {todoTasks.length}</h2>
      {todoTasks.map((task) => (
        <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
      ))}

      {/* Done section */}
      <h2 style={{ marginTop: "20px" }}>Done - {doneTasks.length}</h2>
      {doneTasks.map((task) => (
        <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
      ))}
    </main>
  );
}