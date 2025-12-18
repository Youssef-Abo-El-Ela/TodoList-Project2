import { Button, Card } from "react-bootstrap";
import { useEffect, useMemo, useState } from "react";
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

  const currentTodosParsed = useMemo(
    () => (Array.isArray(JSON.parse(currentTodos.toString())) ? (JSON.parse(currentTodos.toString()) as Todo[]) : []),
    [currentTodos]
  );

  const [viewedTodos, setViewedTodos] = useState<Todo[]>(() =>
    Array.isArray(JSON.parse(currentTodos.toString())) ? (JSON.parse(currentTodos.toString()) as Todo[]) : []
  );

  // keep viewedTodos in sync when the underlying todos change
  useEffect(() => {
    setViewedTodos(currentTodosParsed);
  }, [currentTodosParsed]);

  const handleSearch = (e: Event) => {
    const ce = e as CustomEvent<string>;
    const searchTerm = ce?.detail?.toLowerCase() ?? "";
    const raw = window.localStorage.getItem("todos") ?? "[]";
    const parsed = Array.isArray(JSON.parse(raw)) ? (JSON.parse(raw) as Todo[]) : [];
    if (!searchTerm) {
      setViewedTodos(parsed);
      return;
    }
    const filteredTodos = parsed.filter((todo: Todo) =>
      todo.title.toLowerCase().includes(searchTerm)
    );
    setViewedTodos(filteredTodos);
  };

  useEffect(() => {
    window.addEventListener("searchTodos", handleSearch as EventListener);
    return () => {
      window.removeEventListener("searchTodos", handleSearch as EventListener);
    };
  }, []);

  const changeTodoStatus = (event: React.MouseEvent<HTMLButtonElement>) => {
    const updatedTodos = currentTodosParsed.map((todo: Todo) =>
      todo.id === Number(event.currentTarget.id)
        ? { ...todo, completed: !todo.completed }
        : todo
    );
    setCurrentTodos(JSON.stringify(updatedTodos));
  };

  const deleteTodo = (event: React.MouseEvent<HTMLButtonElement>) => {
    const updatedTodos = currentTodosParsed.filter(
      (todo: Todo) => todo.id !== Number(event.currentTarget.id)
    );
    setCurrentTodos(JSON.stringify(updatedTodos));
  };

  return (
    <div className={styles.todoViewer}>
      {viewedTodos.map((todo: Todo) => {
        return (
          <Card key={todo.id}>
            <Card.Header
              className={todo.completed ? styles.completed : styles.pending}
            >
              {todo.completed ? "Completed" : "Pending"}
            </Card.Header>
            <Card.Body className={styles.cardBody}>
              <Card.Title>{todo.title}</Card.Title>
              <Card.Link href={`/view/${todo.id}`}>Go to details</Card.Link>
              <Button
                onClick={changeTodoStatus}
                className={styles.statusButton}
                id={todo.id.toString()}
                variant={todo.completed ? "warning" : "success"}
              >
                Change to {todo.completed ? "Pending" : "Completed"}
              </Button>
              <Button
                variant="danger"
                className={styles.deleteButton}
                id={todo.id.toString()}
                onClick={deleteTodo}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}
