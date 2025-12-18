import { Button, Form } from "react-bootstrap";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { Todo } from "../../interfaces/Todos";
import styles from "./AddTodoPage.module.css";
import { useNavigate } from "react-router-dom";

export default function AddTodoPage() {
  const [currentTodos, setCurrentTodos] = useLocalStorageState();
  const navigate = useNavigate();

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget); 

    let currentTodosParsed = JSON.parse(currentTodos);
    event.preventDefault();
    setCurrentTodos(
      JSON.stringify([
        ...currentTodosParsed,
        { 
          id: Date.now(),
          title: formData.get("Todo Title")?.toString(),
          content: formData.get("Todo Description")?.toString(),
          completed: false,
          creationDate: new Date().toISOString(),
        } as Todo,
      ])
    );
    navigate("/");
  };

  return (
    <div className={styles.addTodo}>
      <h1>Add New Todo</h1>
      <Form onSubmit={handleAddTodo}>
        <Form.Group>
          <Form.Label>Todo Title</Form.Label>
          <Form.Control required type="text" name="Todo Title" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Todo Description</Form.Label>
          <Form.Control required type="text" name="Todo Description" />
        </Form.Group>
        <Form.Group style={{ textAlign: "center", marginTop: "1rem" }}>
          <Button type="submit">Add</Button>
        </Form.Group>
      </Form>
    </div>
  );
}
