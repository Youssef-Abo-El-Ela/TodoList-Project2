import { Card } from "react-bootstrap";
import { useEffect, useMemo } from "react";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { Todo } from "../../interfaces/Todos";
import styles from "./TodoViewer.module.css";

export default function TodoViewer() {
  const [currentTodos, setCurrentTodos] = useLocalStorageState();

  useEffect(() => {
    if (currentTodos === "[]") {
      setCurrentTodos(JSON.stringify([]));
      window.localStorage.setItem("todos", JSON.stringify([]));
    }
  }, []);

  let currentTodosParsed = useMemo(
    () => Array.from(JSON.parse(currentTodos.toString())) as Todo[],
    [currentTodos]
  );

  return (
    <div className={styles.todoViewer}>
      {currentTodosParsed.map((todo: Todo, index: number) => {
        return (
          <Card key={todo.id}>
            <Card.Header
              className={todo.completed ? styles.completed : styles.pending}
            >
              {todo.completed ? "Completed" : "Pending"}
            </Card.Header>
            <Card.Body>
              <Card.Title>{todo.title}</Card.Title>
              <Card.Link href={`/view/${todo.id}`}>Go to details</Card.Link>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}
