import { Card } from "react-bootstrap";
import { useEffect } from "react";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { Todo } from "../../interfaces/Todos";

const startingTodos: Todo[] = [
  {
    id: 1,
    title: "Sample Todo 1",
    completed: false,
    content: "This is a sample todo item.",
  },
  {
    id: 2,
    title: "Sample Todo 2",
    completed: true,
    content: "This is another sample todo item.",
  },
];

export default function TodoViewer() {
  const [currentTodos, setCurrentTodos] = useLocalStorageState();

  useEffect(() => {
    if (currentTodos === '[]') {
      setCurrentTodos(JSON.stringify(startingTodos));
      window.localStorage.setItem('todos', JSON.stringify(startingTodos));
    }
  }, []);

  let currentTodosParsed = Array.from(
    JSON.parse(currentTodos.toString())
  ) as Todo[];

  return (
    <div>
      {currentTodosParsed.map((todo: Todo) => {
        return (
          <Card>
            <Card.Body>
              <Card.Title>{todo.title}</Card.Title>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}
