"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/page.module.css";

export default function CreateTaskPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const router = useRouter();

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, status }),
    });

    // After creating, go back to home page
    router.push("/");
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Create Task</h1>

      <form onSubmit={addTask} className={styles.submitButtonWrapper}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.submitButtonInputText}
          required
        />
        <input
          type="text"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.submitButtonInputText}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={styles.submitButtonInputText}
        >
          <option value="pending">Pending</option>
          <option value="done">Done</option>
        </select>

        <button type="submit" className={styles.submitButton}>
          Create
        </button>
      </form>
    </main>
  );
}
