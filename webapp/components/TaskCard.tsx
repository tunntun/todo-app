import styles from "../styles/TaskCard.module.css";

type Task = {
  id: number;
  title: string;
  status: string;
};

type TaskCardProps = {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  return (
    <div className={styles.card}>
      <span
        className={`${styles.title} ${
          task.status === "done" ? styles.done : ""
        }`}
      >
        {task.title}
      </span>
      <div className={styles.actions}>
        <button onClick={() => onToggle(task.id)}>✔</button>
        <button onClick={() => onDelete(task.id)}>🗑</button>
      </div>
    </div>
  );
}
