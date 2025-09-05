"use client";

import { useEffect, useState } from "react";

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

    const res = await fetch("http://localhost:4000", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newTitle,
        description: newDescription,
        status: newStatus,
      }),
    });

    const newTask: Task = await res.json();
    setTasks([...tasks, newTask]);

    // reset form
    setNewTitle("");
    setNewDescription("");
    setNewStatus("pending");
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>

      {/* Add Task Form */}
      <form onSubmit={addTask} className="flex flex-col gap-2 mb-6">
        <input
          type="text"
          placeholder="Task title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border rounded p-2"
          required
        />
        <textarea
          placeholder="Task description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          className="border rounded p-2"
        />
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          className="border rounded p-2"
        >
          <option value="pending">Pending</option>
          <option value="done">Done</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded p-2 mt-2"
        >
          Add Task
        </button>
      </form>

      {/* Task List */}
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li key={task.id} className="p-3 border rounded">
            <h2 className="font-semibold">{task.title}</h2>
            <p>{task.description}</p>
            <span
              className={
                task.status === "done" ? "text-green-600" : "text-yellow-600"
              }
            >
              {task.status}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
