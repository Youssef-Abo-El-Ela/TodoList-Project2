import PieChart from "./StatisticsPieChart";
import styles from "./HomePage.module.css";
import TodoViewer from "./TodoViewer";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { Button } from "react-bootstrap";

function HomePage() {
  const [currentTodos] = useLocalStorageState();
  return currentTodos === "[]" ? (
    <div style={{ textAlign: "center" }}>
      <h2 >
        No todos available. Please add some todos.
      </h2>
      <Button href="/add">
        Add Todo
      </Button>
    </div>
  ) : (
    <div className={styles.homepage}>
      <Button href="/add">Add Todo</Button>
      <PieChart />
      <h1>My Todos</h1>
      <TodoViewer />
    </div>
  );
}

export default HomePage;
