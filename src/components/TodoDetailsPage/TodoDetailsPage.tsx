import { useParams } from "react-router-dom";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { Todo } from "../../interfaces/Todos";
import { Button, Card } from "react-bootstrap";
import styles from "./TodoDetailsPage.module.css";
import { useMemo } from "react";

export default function TodoDetailsPage() {
  const [currentTodos, setCurrentTodos] = useLocalStorageState();

  const { id } = useParams();

  let currentTodosParsed = useMemo(() => {
    return Array.from(JSON.parse(currentTodos.toString())) as Todo[];
  }, [currentTodos]);

  let currentTodo = currentTodosParsed.find(
    (todo) => todo.id === Number(id)
  ) as Todo;
  
  const changeTodoStatus = (event: React.MouseEvent<HTMLButtonElement>) => {
    const updatedTodos = currentTodosParsed.map((todo) =>
      todo.id === Number(id) ? { ...todo, completed: !todo.completed } : todo
    );
    setCurrentTodos(JSON.stringify(updatedTodos));
  };

  return (
    <div className={styles.cardContainer}>
      {
        <Card key={id} className={styles.cardStyle}>
          <Card.Header
            className={
              currentTodo.completed ? styles.completed : styles.pending
            }
          >
            {currentTodo.completed ? "Completed" : "Pending"}
          </Card.Header>
          <Card.Body>
            <Card.Title>{currentTodo.title}</Card.Title>
            <Card.Text>{currentTodo.content}</Card.Text>
            <Card.Text>
              Creation Date:{" "}
              {new Date(currentTodo.creationDate).toLocaleDateString()}
            </Card.Text>
            <Card.Text>
              Creation Hour:{" "}
              {new Date(currentTodo.creationDate).toLocaleTimeString()}
            </Card.Text>
            <Button onClick={changeTodoStatus}>
              Change to {currentTodo.completed ? "Pending" : "Completed"}
            </Button>
          </Card.Body>
        </Card>
      }
    </div>
  );
}
